<template>
  <v-row class="main">
    <LoadingLinear v-if="$store.state.loading" />

    <!-- <v-col cols="12" sm="8" md="6"> NuxtJS </v-col> -->

    <!-- <v-btn @click="setLoadingComp">set loading</v-btn> -->
    <LoadingCircle v-if="$store.state.loading" />
  </v-row>
</template>

<script>
export default {
  name: 'Home',
  // middleware: 'authenticated',
  components: {
    // NuxtLogo: () => import('~/components/NuxtLogo.vue'),
    // VuetifyLogo: () => import('~/components/VuetifyLogo.vue')
    LoadingCircle: () => import('~/components/common/loading/LoadingCircle.vue'),
    LoadingLinear: () => import('~/components/common/loading/LoadingLinear.vue')
  },
  layout: 'admin',
  data () {
    return {
      // loading: this.$store.state.loading,
    }
  },
  mounted () {
    this.$store.dispatch('getPeople')
    this.setLoadingComp()
  },
  methods: {
    setLoadingComp () {
      this.$store.commit('SET_LOADING', true)
      setTimeout(() => {
        this.$store.commit('SET_LOADING', false)
      }, 1000)
    }
  }
}
</script>
