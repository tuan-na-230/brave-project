<template>
  <LoginForm />
</template>

<script>
export default {
  name: 'Login',
  components: {
    LoginForm: () => import('~/components/common/login/LoginForm')
  },
  layout: 'auth'
}
</script>
