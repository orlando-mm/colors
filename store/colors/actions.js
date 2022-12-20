import endpoint from '~/endpoint';
const { colors } = endpoint;

export default {
  async listColors({ commit }) {
    try {
      const data = await this.$api.get(colors.list);
      if (data) {
        // eslint-disable-next-line no-console
        console.log(data)
        // commit('SET_COLLECTIONS', data.data);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('colors list action', e);
      if (e.statusCode === 404) throw e;
    }
  },
};
