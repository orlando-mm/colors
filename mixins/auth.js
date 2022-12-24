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
            console.log(this.$t('list.successfulOperation'));
            this.$flash({
              message: this.$t('list.successfulOperation')
            });
            await this.$router.push(this.localePath('/'));
          }
        } catch (e) {
          console.error(this.$t('list.operationFailed'), e);
          this.$flash({
            message: `${this.$t('list.operationFailed')}: ${e}`,
            color: 'error'
          });
        }
        this.loading = false;
      }
    },
    async logoutUser() {
      this.loading = true;
      try {
        await this.$auth.logout();
        console.log(this.$t('list.successfulOperation'));
        this.$flash({
          message: this.$t('list.successfulOperation')
        });
        window.localStorage.clear();
        await this.$router.push(this.localePath('/'));
      } catch (e) {
        console.log('error logout ', e);
        this.$flash({
          message: `${this.$t('list.operationFailed')}: ${e}`,
          color: 'error'
        });
      }
      this.loading = false;
    }
  }
};
