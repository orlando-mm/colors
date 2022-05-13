import { mapActions } from 'vuex'

export default {
  data: function () {
    return {
      email: '',
      password: '',
      errorMessages: {},
      loading: false,
      formValid: true,
    }
  },
  methods: {
    ...mapActions({
      register: 'authentication/register',
    }),
    clearPasswordError() {
      delete this.errorMessages.password
    },
    clearUsernameError() {
      this.errorMessages = {}
    },
    async userLogin() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const { email, password } = this
          const { data } = await this.$auth.loginWith('local', {
            data: { email, password },
          })
          console.log('DATA DEL LOGIN')
          console.log(data)
          console.log('estado de loggedIn')
          console.log(this.$auth.loggedIn)
          console.log('AUTH luego de login')
          console.log(this.$auth)
          console.log('TOKEN STATUS')
          console.log(this.$auth.strategy.token.status())
          console.log('AUTH USER')
          console.log(this.$auth.user)
          //  await this.$auth.strategy.token.set(data.accessToken)
          //  await this.$auth.setUser(data.user)
          console.log('USUARIO LOGUEADO CORRECTAMENTE')
          await this.$router.push(this.localePath({ name: 'index' }))
        } catch (e) {
          console.error('error en login', e)
          /*  this.errorMessages = (e.response || {}).data
          if (this.errorMessages['non_field_errors']) {
            console.log(this.errorMessages['non_field_errors'][0])
          }
          if (this.errorMessages.code === 'user_not_found') {
            console.log(this.errorMessages.detail)
          } */
        }
        this.loading = false
      }
    },
    async registerUser() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const user = {
            email: this.email,
            password: this.password,
          }
          const data = await this.register(user)
          console.log('DATA DEL REGISTER')
          console.log(data)
          if (!data.error) {
            console.log('USUARIO REGISTRADO CORRECTAMENTE, REVISE SU EMAIL')
            this.email = ''
            this.password = ''
            this.errorMessages = {}
            this.clearPasswordError()
            this.clearUsernameError()
            this.loading = false
          } else {
            this.errorMessages = data.object
            this.loading = false
          }
        } catch (e) {
          console.error('error register', e)
        }
      }
    },
    async logoutUser() {
      this.loading = true
      try {
        await this.$auth.logout()
        console.log('SE HA CERRADO SESION CORRECTAMENTE')
        window.localStorage.clear()
        await this.$router.push(this.localePath('/'))
      } catch (e) {
        console.log('error logout ', e)
      }
      this.loading = false
    },
  },
}
