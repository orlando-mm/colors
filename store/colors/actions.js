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
      console.error('colors list action', e);
      if (e.statusCode === 404) throw e;
      return { success: false, data: e };
    }
  },
  async createColor(_, { ...payload }) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: colors.create,
        data: payload
      });
      return { success: true, data };
    } catch (e) {
      console.log(e);
      if (e.statusCode === 404) throw e;
      return { success: false, data: e };
    }
  },
  async updateColor(_, { ...payload }) {
    try {
      const { data } = await this.$api({
        method: 'PUT',
        url: colors.update(payload?.calendar_patterns?.id),
        data: payload
      });
      return { success: true, data };
    } catch (e) {
      console.log(e);
      if (e.statusCode === 404) throw e;
      return { success: false, data: e };
    }
  },
  async showColor({ commit }, id) {
    try {
      const { data } = await this.$api.get(colors.show(id));
      if (data?.data) {
        commit('SET_SHOW_COLOR', data.data);
      }
      return { success: true, data };
    } catch (e) {
      console.log(e);
      if (e.statusCode === 404) throw e;
      return { success: false, data: e };
    }
  }
};
