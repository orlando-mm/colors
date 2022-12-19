import Cookie from 'js-cookie';
import helper from './api-helper';
export default function ({ $axios, app }, inject) {
  Cookie.set('colors_language', app.i18n.locale);
  const apiFree = $axios.create();
  apiFree.onError = helper.onError;
  // apiFree.interceptors.request.use((config) => {
  //   delete config.headers.common.Authorization;
  //   return config;
  // });
  apiFree.defaults.baseURL = '/';
  inject('apiFree', apiFree);
}
