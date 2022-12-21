import endpoint from '~/endpoint';
const { colors } = endpoint;

export default {
  async listColors({ commit }, filter) {
    try {
      const data = await this.$api.get(colors.list(filter));
      if (data?.data?.data?.entities.length) {
        commit('SET_LIST_COLORS', data.data.data.entities);
      }
      if (data?.data?.data?.pagination) {
        commit('SET_PAGINATION', data?.data?.data?.pagination);
      }
      return { success: true, data };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('colors list action', e);
      if (e.statusCode === 404) throw e;
      return { success: false, data: e };
    }
  }
};
