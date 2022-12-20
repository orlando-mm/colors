export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessages: {},
      loading: false,
      formValid: true
    };
  },
  methods: {
    async userLogin() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          const { email, password } = this;
          const { data } = await this.$auth.loginWith('local', {
            data: JSON.stringify({ login: { email, password } })
          });
          if (data?.success) {
            await this.$auth.strategy.token.set(data?.data?.result?.access_token);
            await this.$auth.setUser(data?.data?.result?.name);
            await this.$router.push(this.localePath({ name: 'list' }));
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('error en login', e);
          /*  this.errorMessages = (e.response || {}).data
          if (this.errorMessages['non_field_errors']) {
            console.log(this.errorMessages['non_field_errors'][0])
          }
          if (this.errorMessages.code === 'user_not_found') {
            console.log(this.errorMessages.detail)
          } */
        }
        this.loading = false;
      }
    },
    async logoutUser() {
      this.loading = true;
      try {
        await this.$auth.logout();
        // eslint-disable-next-line no-console
        console.log('SE HA CERRADO SESION CORRECTAMENTE');
        window.localStorage.clear();
        await this.$router.push(this.localePath('/'));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error logout ', e);
      }
      this.loading = false;
    }
  }
};
