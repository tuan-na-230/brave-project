<template>
  <div class="block-forgot">
    <h1 class="block-forgot__title">
      Forgot password
    </h1>
    <form>
      <v-text-field
        v-model="email"
        placeholder="Enter your email"
        color="primary"
        outlined
        required
        :error-messages="getErrors('email', $v.email)"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      />
      <div class="gotologin">
        <p @click="goToLogin">
          Login
        </p>
      </div>
      <v-btn block large color="primary" @click="submit">
        Send
      </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ForgotPassword',
  mixins: [validationMixin],
  layout: 'auth',
  validations: {
    email: { required, email }
  },
  data () {
    return { email: '' }
  },
  methods: {
    getErrors (name, model) {
      const errors = []
      if (!model.$dirty) { return errors }
      switch (name) {
        case 'email':
          !model.required && errors.push('Email  is required')
          !model.email && errors.push('Must be valid e-mail')
          break
        default:
          break
      }
      return errors
    },
    goToLogin () {
      this.$router.push('/login')
    },
    submit () {
      this.$v.$touch()
      console.log('submit')
    }
  }
}
</script>

<style lang="scss">
.block-forgot {
  width: 20rem;
  &__title {
    margin-bottom: 2.4rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    color: #7c8ca2;
  }
  .gotologin {
    display: flex;
    justify-content: flex-end;
    color: #8ac1e1;
    text-decoration: underline;
    padding-bottom: 0.3rem;
    p {
      cursor: pointer;
    }
  }
}
</style>
