import endpoint from '~/endpoint'
const { authentication } = endpoint

export default {
  // eslint-disable-next-line no-unused-vars
  async register({ commit }, user) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: authentication.register,
        data: user,
      })
      return data
    } catch (e) {
      console.error('action register error', e)
      if (e.statusCode === 404) throw e
      return { error: true, object: e }
    }
  },
  // eslint-disable-next-line no-unused-vars
  /*  async verifyEmail({ commit }, token) {
    try {
      const { data } = await this.$api({
        method: 'POST',
        url: authentication.verifyEmail(),
        data: { key: token },
      })
      return data
    } catch (e) {
      console.error('verify error', e)
      if (e.statusCode === 404) throw e
      return { error: true, object: e }
    }
  },  */
}
