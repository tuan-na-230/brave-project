<template>
  <v-row class="main">
    <!-- <v-col cols="12" sm="8" md="6"> NuxtJS </v-col> -->
    123
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {
    // NuxtLogo: () => import('~/components/NuxtLogo.vue'),
    // VuetifyLogo: () => import('~/components/VuetifyLogo.vue')
    // Loading: () => import('~/components/common/loading/LoadingCircle.vue')
  },
  layout: 'test',
  data () {
    return {
      // loading: this.$store.state.loading,
    }
  },
  mounted () {
    this.$store.dispatch('getPeople')
  },
  methods: {
    setLoadingComp () {
      this.$store.commit('SET_LOADING', true)
    }
  }
}
</script>
