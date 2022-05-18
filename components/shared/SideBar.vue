<template>
  <v-navigation-drawer
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
    color="secondary"
    class="sidebar"
  >
    <div class="layoutside">
      <div class="content">
        <div class="content__logo">
          <h2 v-if="!miniVariant">
            <img
              class="content__logo--logo"
              :src="logoTitle"
              width="110"
              height="30"
              alt="title"
            >
          </h2>
          <img
            v-if="miniVariant"
            class="content__logo--logo"
            width="28"
            height="28"
            :src="logoTitle"
            alt="icon"
          >
          <p
            v-if="!miniVariant"
            class="nav__title-sub"
            style="
              font-size: 1.5rem;
              line-height: 1;
              margin-top: 2rem;
              text-align: center;
            "
          >
            {{ $t('sideBar.title') }}
          </p>
        </div>
        <div class="content__personal">
          <v-avatar color="primary" :size="sizeAvt">
            HN
          </v-avatar>
          <div class="content__personal__text">
            <div>{{ $t('sideBar.welcome', { name: 'Hung' }) }}</div>
            <!-- <div class="content__personal__text__name">Hung</div> -->
            <div>{{ $t('sideBar.administrator') }}</div>
          </div>
        </div>
        <v-card class="content__nav">
          <v-list>
            <!-- color="#fff" -->
            <v-list-group
              v-for="(item, key) in sidebarMenus"
              :key="key"
              :prepend-icon="item.icon"
            >
              <template #activator>
                <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
              </template>
              <v-list-item
                v-for="([title, icon], i) in item.subItems"
                :key="i"
                link
              >
                <v-list-item-icon>
                  <v-icon light v-text="icon" />
                </v-list-item-icon>
                <v-list-item-title v-text="title" />
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </div>
      <div v-if="!miniVariant" class="footer">
        <p class="footer__copyright">
          Copyright © 2022 Fuji speedway
        </p>
        <ul class="footer__link">
          <li class="footer__link--item">
            <a href="#" class="u-link" target="_blank">Privacy</a>
          </li>
          <li class="footer__link--item">
            <a href="#" class="u-link" target="_blank">T &amp; C</a>
          </li>
        </ul>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import logoTitle from '~/assets/images/logo.png'
export default {
  name: 'SideBar',
  props: {
    clipped: Boolean,
    fixed: Boolean,
    miniVariant: Boolean
  },
  data () {
    return {
      logoTitle,
      sizeAvt: 60,
      sidebarMenus: [
        {
          icon: 'mdi-home',
          title: 'sideBar.menu.home',
          subItems: [['Dashboard', 'mdi-view-dashboard']]
        },
        {
          icon: 'mdi-account',
          title: 'sideBar.menu.account',
          subItems: [
            ['Member accounts', 'mdi-view-dashboard'],
            ['MTM accounts', 'mdi-view-dashboard']
          ]
        },
        {
          icon: 'mdi-wrench',
          title: 'sideBar.menu.configuration',
          subItems: [['MT server master', 'mdi-view-dashboard']]
        },
        {
          icon: 'mdi-cog-outline',
          title: 'sideBar.menu.setting',
          subItems: [
            ['Manage accounts', 'mdi-view-dashboard'],
            ['Permission setting', 'mdi-view-dashboard']
          ]
        }
      ]
    }
  },
  watch: {
    miniVariant (newValue, oldValue) {
      newValue ? (this.sizeAvt = 40) : (this.sizeAvt = 60)
    }
  }
}
</script>

<style lang="scss" scoped>
// .v-list-item__title {
//   font-size: 1.6rem;
// }
@mixin blockLogo {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  border: 0;
}
.sidebar {
  height: 100%;
  // background-color: $secondaryColor;
  .expan-header {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .layoutside {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    .content {
      display: flex;
      flex-direction: column;
      margin-top: 4.8rem;
      color: #fff;
      &__logo {
        text-align: center;
        h2 {
          padding: 0 1.5rem;
        }
        &--logo {
          display: block;
          @include blockLogo;
        }
        &--minilogo {
          display: none;
          @include blockLogo;
        }
      }
      &__personal {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        font-size: 1rem;
        padding: 0 1rem;
        &__text {
          text-align: center;
          &__name {
            font-weight: bold;
            font-size: 1.5rem;
          }
        }
      }
      &__nav {
        margin-top: 1.5rem;
      }
      &__footer {
        text-align: center;
        margin-top: auto;
      }
    }
    .footer {
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      margin-top: auto;
      padding-bottom: 2rem;
      color: #ffffff;
      align-items: center;
      &__link {
        padding-left: 0;
        display: flex;
        gap: 0.5rem;
        li {
          list-style: none;
        }
        &--item {
          border-right: 1px solid #ddd;
          padding: 0 0.4rem;
          .u-link {
            text-decoration: underline;
            font-size: 0.7rem;
            color: inherit;
          }
        }
        &--item:last-child {
          border-right: unset;
        }
      }
    }
  }
}
</style>
