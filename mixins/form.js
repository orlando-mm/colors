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
      }
    };
  },
  methods: {
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
      console.log(message);
      return data;
    },
    handleActionResponse({ success, data, successMessage, showErrorAsMessage }) {
      if (success) {
        successMessage && console.log(successMessage);
        return {};
      } else {
        return this.handleErrorResponse(data, showErrorAsMessage);
      }
    },
    showFirstFieldMessage(data) {
      const defaultMessage = this.$t('validation.unknownError');
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
