export default {
  computed: {
    isLoggedIn() {
      return !!this.$auth.$state.loggedIn;
    }
  }
};
