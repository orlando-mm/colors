RegExp.quote = function (str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};
export default {
  data() {
    return {
      rules: {
        required: (value) => {
          return !!value || this.$t('login.required');
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || this.$t('login.emailValidation');
        },
        password: (value) => {
          return !value || value.length > 7 || this.$t('login.passwordShort');
        }
        /*
        requiredProfile: (value) => {
          return !!value || false
        },
        date: (value) => {
          return (
            !value ||
            this.$moment(value, 'DD/MM/YYYY', true).isValid() ||
            this.$t('login.date')
          )
        },
        positive: (value) => {
          const pattern = /^\d{0,10}(\.\d{0,2})?$/
          return pattern.test(value) || this.$t('login.positive')
        },
        phone: (value) => {
          const pattern = /^\+?1?\d{9,15}$/
          return pattern.test(value) || this.$t('profile.phoneValidation')
        }, */
      }
    };
  },
  methods: {
    autocompleteField() {
      return `${Math.random()}_random_field`;
    },
    handleErrorResponse(data, showErrorAsMessage) {
      if (!data) {
        return {};
      }
      let message = '';
      if (data.error) {
        message = data.error;
      } else if (data.detail || data.non_field_errors) {
        message = data.detail || data.non_field_errors[0];
      } else if (!showErrorAsMessage) {
        message = this.$t('validation.fillRequiredFields');
      } else {
        message = this.showFirstFieldMessage(data);
      }
      /*  this.$flash({
        message: message,
        color: 'error',
      })  */
      console.log(message);
      return data;
    },
    handleActionResponse({ success, data, successMessage, showErrorAsMessage }) {
      if (success) {
        //  successMessage && this.$flash(successMessage)
        successMessage && console.log(successMessage);
        return {};
      } else {
        return this.handleErrorResponse(data, showErrorAsMessage);
      }
    },
    showFirstFieldMessage(data) {
      const defaultMessage = this.$t('appMessages.unknownError');
      let message = '';
      try {
        message = Object.values(data)[0];
      } catch {
        console.warn(message);
      }
      return message || defaultMessage;
    }
  }
};
