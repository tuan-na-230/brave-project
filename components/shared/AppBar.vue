<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
    dense
    color="secondary"
    elevation="0"
  >
    <v-app-bar-nav-icon color="primary" @click.stop="toggleMiniVariant" />
    <!-- <v-toolbar-title v-text="title" /> -->
    <v-spacer />

    <div class="group-language">
      <v-btn-toggle v-model="toggleLang" small mandatory>
        <v-btn
          v-for="locale in $i18n.locales"
          :key="locale.code"
          small
          @click="changeLanguage(locale.code)"
        >
          {{ locale.name }}
        </v-btn>
      </v-btn-toggle>
    </div>
    <v-btn
      v-if="!$auth.$state.loggedIn"
      color="primary"
      height="30px"
      @click="goLogin"
    >
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
    <template v-if="$auth.$state.loggedIn">
      <v-avatar
        color="primary"
        :size="sizeAvtNav"
        style="color: #fff; font-size: 0.8rem"
      >
        {{ nameToAvatar('Hung') }}
      </v-avatar>
      <v-menu offset-y min-width="10rem">
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="primary">
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" link>
            <v-list-item-title @click="getAction(item.title, i)">
              {{
                item.title
              }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import { nameToAvatar } from '~/utils'
export default {
  name: 'AppBar',
  props: {
    clipped: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // clipped: false,
      // fixed: false,
      // miniVariant: false,
      toggleLang: 0,
      title: 'Fuji speedway',
      sizeAvtNav: 30,
      items: [
        { title: 'Profile' },
        { title: 'Settings' },
        { title: 'Help' },
        { title: 'Logout' }
      ]
    }
  },
  watch: {},
  methods: {
    nameToAvatar (name) {
      return nameToAvatar(name)
    },
    toggleMiniVariant () {
      this.$emit('toggleMiniVariant')
    },
    getAction (item, idx) {
      if (idx === 3) {
        this.goLogout()
      }
    },
    async goLogout () {
      await this.$auth.logout()
    },
    goLogin () {
      this.$router.push('/login')
    },
    changeLanguage (code) {
      this.$i18n.setLocale(code)
    }
  }
}
</script>

<style lang="scss" scoped>
.group-language {
  margin: 0 1rem;
}
</style>
