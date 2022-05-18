<template>
  <v-app>
    <app-bar :clipped="clipped" :fixed="fixed" :mini-variant="miniVariant" @toggleMiniVariant="toggleMiniVariant" />
    <side-bar :clipped="clipped" :fixed="fixed" :mini-variant="miniVariant" />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '../components/shared/AppBar.vue'
import SideBar from '../components/shared/SideBar.vue'
export default {
  name: 'AdminLayout',
  components: { AppBar, SideBar },
  middleware: ['auth'],
  data () {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      title: 'Fuji speedway'
    }
  },
  watch: {

  },
  methods: {
    toggleMiniVariant () {
      this.miniVariant = !this.miniVariant
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
