<template>
  <v-app dark>
    <div class="auth">
      <Nuxt />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'Auth'
}
</script>
<style lang="scss">
.auth {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 9.6rem 0;
}
</style>
