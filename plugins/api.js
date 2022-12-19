import Cookie from 'js-cookie';
import helper from './api-helper';

export default function ({ $axios, app }, inject) {
  Cookie.set('colors_language', app.i18n.locale);

  const api = $axios.create({
    baseURL: process.env.baseUrl
  });

  api.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      Authorization: app.$auth.strategy.token.get(),
      'Accept-Language': app.i18n.locale
    };
    return config;
  });

  api.onError(async ({ response, config }) => {
    const originalRequest = config;
    let result = response.data;
    const code = response.status;
    const codeCondition = code === 500 || code === 502 || code === 405 || code === 403 || code === 408 || code === 300;
    if (codeCondition) {
      result = { code, detail: code };
    }

    if (code === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const token = await helper.refreshToken(app.$auth.strategy.refreshToken.get());
        await app.$auth.strategy.token.set(token);
        return api(originalRequest);
      } else {
        return app.router.push(app.localePath('/login'));
      }
    }
    return Promise.reject(result);
  });
  api.defaults.baseURL = '/';
  inject('api', api);
}
