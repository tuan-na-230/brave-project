<template>
  <div class="block-login">
    <h1 class="block-login__title">
      Login
    </h1>
    <form>
      <div>
        <v-text-field
          v-model="ruleForm.email"
          placeholder="Email"
          color="primary"
          outlined
          required
          :error-messages="getErrors('email', $v.ruleForm.email)"
          @input="$v.ruleForm.email.$touch()"
        />
      </div>
      <div>
        <v-text-field
          v-model="ruleForm.password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          name="input-10-2"
          outlined
          placeholder="Password"
          class="input-group--focused"
          :error-messages="getErrors('password', $v.ruleForm.password)"
          required
          @click:append="showPass = !showPass"
          @input="$v.ruleForm.password.$touch()"
        />
      </div>
      <div class="keepstay">
        <v-checkbox v-model="keepSignin" :label="`Stay signed in`" />
        <div class="keepstay__forgot" @click="goToForgot">
          Forgot password
        </div>
      </div>
      <v-btn
        block
        large
        color="primary"
        :loading="loading"
        @click.prevent="submit"
      >
        Login
      </v-btn>
    </form>
    <div class="or">
      <span class="or__text">or</span>
    </div>
    <v-btn outlined block large class="btn-google">
      <v-icon color="#989898" x-large>
        mdi-google-plus
      </v-icon>
    </v-btn>
    <footer class="footer">
      <h2 style="background: #3c3c3c;">
        <img
          :src="logo"
          alt="p2t"
          width="158"
          height="42"
          @click="$router.push('/home')"
        >
      </h2>
      <div class="copyright">
        <p class="copyright__content">
          Copyright © 2017-2022 <br>Fuji speedway PTE LTD. All rights reserved
        </p>
      </div>
      <ul class="footer__link">
        <li class="footer__link--item">
          <a
            href="#"
            class="u-link"
            target="_blank"
          >Privacy Policy</a>
        </li>
        <li class="footer__link--item">
          <a
            href="#"
            class="u-link"
            target="_blank"
          >Terms &amp; Conditions</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
import { validateVar } from '~/utils'
import logo from '~/assets/images/logo.png'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  validations: {
    ruleForm: {
      email: { required, email },
      password: { required, maxLength: maxLength(20), minLength: minLength(8) }
    }
  },
  data () {
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      logo,
      loading: false,
      showPass: false,
      keepSignin: false
    }
  },
  methods: {
    getErrors (name, model) {
      const errors = []
      if (!model.$dirty) { return errors }
      switch (name) {
        case 'email':
          !model.required && errors.push(validateVar.email_required)
          !model.email && errors.push(validateVar.email_valid)
          break
        case 'password':
          !model.maxLength && errors.push(validateVar.password_maxLength)
          !model.minLength && errors.push(validateVar.password_minLength)
          !model.required && errors.push(validateVar.password_required)
          break
        default:
          break
      }
      return errors
    },
    goToForgot () {
      this.$router.push('/forgot-password')
    },
    handleLogin (payload) {
      if (payload) {
        localStorage.setItem('access_token', 123)
        this.$router.push('/')
      }
    },
    async submit () {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        console.log('submit')
        await this.$auth.loginWith('local', {
          username: '',
          passsword: ''
        })
        await Promise.all([this.$auth.setUserToken('123')]).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block-login {
  width: 22rem;
  &__title {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 400;
    color: $primaryColor;
  }
  .keepstay {
    display: flex;
    margin-top: -1rem;
    justify-content: space-between;
    align-items: center;
    color: $secondaryColor;
    &__forgot {
      color: $secondaryColor;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .or {
    margin: 0.5rem 0;
    text-align: center;
    position: relative;
    &::after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: #ddd;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &__text {
      display: inline-block;
      padding: 1rem;
      line-height: 1;
      font-size: 0.75rem;
      font-weight: 100;
      background-color: #ffffff;
      position: relative;
      z-index: 5;
    }
  }
  .btn-google {
    border: 1px solid #ddd;
  }
  .footer {
    display: flex;
    flex-direction: column;
    margin-top: 5.8rem;
    img {
      cursor: pointer;
      display: block;
      max-width: 100%;
      height: auto;
      margin: 0 auto;
      border: 0;
    }
    .copyright {
      font-size: 0.8rem;
      margin-top: 3rem;
      &__content {
        display: block;
        width: 100%;
        text-align: center;
        color: #666;
      }
    }
    &__link {
      display: flex;
      margin-top: 0.7rem;
      align-items: center;
      justify-content: center;
      li {
        list-style: none;
      }
      &--item {
        padding: 0 1rem;
        border-right: 1px solid #ddd;
        .u-link {
          font-size: 0.8rem;
          text-decoration: underline;
          color: #0085b2;
        }
      }
      &--item:last-child {
        border-right: unset;
      }
    }
  }
}
</style>
