<template>
  <div class="error-page">
    <h1>Fuji speedway</h1>
    <div class="content">
      <div>
        <h1 class="content__notfound">
          PAGE <br>NOT FOUND
        </h1>
        <p>
          We’re sorry, but we can’t find the URL you are attempting to access.
        </p>
        <br>
        <p>
          Click <nuxt-link style="color: #2f89b3" to="/">
            here
          </nuxt-link> to go
          to the home page
        </p>
      </div>
      <div><img src="~/assets/images/bg-error.png" alt=""></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmptyLayout',
  layout: 'errorLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .content {
    margin-top: 6rem;
    display: flex;
    max-width: 40rem;
    gap: 6rem;
    justify-content: space-between;
    &__notfound {
      margin-bottom: 1rem;
      font-weight: normal;
    }
  }
}
</style>
