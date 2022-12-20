// import authentication from '../endpoint/authentication';
// const axios = require('axios');

export default {
  /* refreshToken: async (refresh) => {
    try {
      const { data } = await axios.post(authentication.token.create, {
        refresh
      });
      return data.access;
    } catch (e) {
      return false;
    }
  }, */
  onError({ response }) {
    let result = response.data;
    const constant = 'Un error ha ocurrido y su petición no ha podido ser completada. ';
    switch (response.status) {
      case 404:
        result = { statusCode: 404, message: `${constant} (404)` };
        break;
      case 500:
        result = { code: 500, detail: `${constant} (500)` };
        break;
      case 502:
        result = { code: 502, detail: `${constant} (502)` };
        break;
      case 300:
        result = { code: 300, detail: `${constant} (300)` };
        break;
      case 405:
        result = {
          code: 405,
          detail: `no se permite el uso de ese método. (405)`
        };
        break;
      case 403:
        result = {
          code: 403,
          detail: `la petición es correcta pero el servidor se niega a ofrecerte el recurso o página web. (405)`
        };
        break;

      case 408:
        result = {
          detail: `el servidor ha pasado demasiado tiempo esperando una respuesta por parte del cliente (405)`
        };
        break;
      case 401:
        result = {
          detail: `el servidor ha pasado demasiado tiempo esperando una respuesta por parte del cliente (405)`
        };
        break;
    }
    return Promise.reject(result);
  }
};
