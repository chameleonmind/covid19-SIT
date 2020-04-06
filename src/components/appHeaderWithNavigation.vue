<template>
  <div class="header-with-nav" :class="{'shadow' : userScrolled}">
    <div class="app-container">
      <router-link to="/" class="logo-link">
        <h1 class="app-title">{{$shortAppName}}</h1>
      </router-link>
      <div class="desktop-menu">
        <router-link v-for="item in menuItems"
                     :key="item.name"
                     :to="item.url"
                     class="header-link">
          {{item.name}}
        </router-link>
        <div class="share-menu">
          <basic-dropdown :chevron-visible="false"
                          class="color-dropdown">
            <div class="share-button">
              <i class="icon-share-2"></i>
            </div>
            <div slot="dropdown">
              <div class="dropdown-base">
                <a v-for="(link, idx) in shareLinks"
                   :key="'share'+idx"
                   :href="link.url"
                   target="_blank"
                   class="link">
                  <i :class="link.icon"></i> {{link.name}}
                </a>
              </div>
            </div>
          </basic-dropdown>
        </div>
      </div>
      <div class="mobile-menu">
        <basic-dropdown :chevron-visible="false">
          <div class="menu-button">
            <i class="icon-menu"></i>
          </div>
          <div slot="dropdown">
            <div class="dropdown-base">
              <router-link v-for="item in menuItems"
                           :key="item.name"
                           :to="item.url"
                           class="header-link">
                {{item.name}}
              </router-link>
              <h3 class="submenu-title">{{$t('translations.common.share')}}</h3>
              <a v-for="(link, idx) in shareLinks"
                 :key="'share'+idx"
                 :href="link.url"
                 target="_blank"
                 class="header-link">
                <i :class="link.icon"></i> {{link.name}}
              </a>
            </div>
          </div>
        </basic-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import BasicDropdown from './common/dropdown'

export default {
  name: 'appHeaderWithNavigation',
  components: { BasicDropdown },
  data () {
    return {
      userScrolled: false,
      menuItems: [
        {
          name: this.$t('translations.menu.homePage'),
          url: '/'
        },
        {
          name: this.$t('translations.menu.statistics'),
          url: '/stats'
        },
        {
          name: this.$t('translations.menu.aboutPage'),
          url: '/about'
        },
        {
          name: this.$t('translations.menu.settingsPage'),
          url: '/settings'
        }
      ],
      shareLinks: [
        {
          name: 'Facebook',
          icon: 'icon-facebook',
          url: 'https://www.facebook.com/sharer/sharer.php?u=https://covid19-sit.netlify.com/#/'
        },
        {
          name: 'Twitter',
          icon: 'icon-twitter',
          url: `https://twitter.com/intent/tweet?hashtags=Covid19&original_referer=https://covid19-sit.netlify.com/&text=${this.$t('translations.share.twitterText')}&url=https://covid19-sit.netlify.com/#/&via=dr_nekorektan`
        },
        {
          name: 'Email',
          icon: 'icon-mail',
          url: 'mailto:?subject=Covid-19 Aplikacija za praćenje izolacije'
        }
      ]
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll () {
      this.userScrolled = window.scrollY > 100
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .desktop-menu {
    display: none;

    @media screen and (map_get($breakpoints, 'sm')) {
      display: block;
    }

    .header-link {
      color: $text-button;
      margin: 0 1rem;
      border: none;
      position: relative;

      &:hover, &:focus, &:visited {
        border: none;
      }

      &::after {
        position: absolute;
        content: '';
        width: 0.25rem;
        height: 0.25rem;
        border-radius: 10px;
        background-color: transparent;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.3s, background-color 0.3s;
      }

      &.router-link-exact-active {
        position: relative;

        &::after {
          width: 2rem;
          background-color: $text-button;
        }
      }
    }
  }

  .header-with-nav {
    background: $primary;
    transition: box-shadow 0.3s ease;

    &.shadow {
      box-shadow: $shadow-strong;
      opacity: 0.95;
      transition: opacity .3s, box-shadow 0.3s ease;

      &:hover {
        opacity: 1;
      }
    }

    .app-container {
      min-height: 4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $text-button;
      padding: 1rem;
    }

    .logo-link {
      color: $text-button;
      text-decoration: none;
      border: none;
    }
    .app-title {
      font-size: 1rem;
      margin: 0;
    }

    .mobile-menu {
      .menu-button {
        font-size: 1.5rem;
        padding: 0 0.5rem;
      }

      .dropdown-base {
        background: $base;
        box-shadow: $shadow-sm;
        border-radius: $default-radius;
        width: 100%;
        overflow: hidden;
        min-width: 180px;

        .header-link, .header-link:visited, .header-link:focus {
          display: block;
          text-align: center;
          padding: 1rem 1.5rem;
          border: none;
          position: relative;
          transition: background-color 0.2s;

          &:hover {
            background-color: $secondary;
            color: $text-button;
            border: none;
          }

          &:not(:last-child) {
            margin-bottom: 0.5rem;
          }

          &::before {
            position: absolute;
            content: '';
            left: 0.5rem;
            top: 1.4rem;
            width: 0.25rem;
            height: 0.25rem;
            border-radius: 16px;
            background-color: transparent;
            transition: width 0.2s, background-color 0.2s;
          }

          &.router-link-exact-active {
            color: $secondary;
            font-weight: bold;

            &:hover {
              color: $text-button;

              &::before {
                background-color: $text-button;
              }
            }

            &::before {
              width: 1.25rem;
              background-color: $primary;
            }
          }
        }
      }

      .submenu-title {
        color: $text-alt2;
        font-size: 0.9rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: normal;
        display: flex;
        align-items: center;
        position: relative;

        &::after, &::before {
          position: relative;
          content: '';
          flex: 1 1 auto;
          height: 1px;
          background-color: $text-alt2;
          margin-left: 1rem;
          margin-right: 1rem;
          opacity: 0.5;
        }
      }

      @media screen and (map_get($breakpoints, 'sm')) {
        display: none;
      }
    }

    .share-menu {
      display: inline-block;
      margin-left: 1rem;

      .share-button {
        padding: 0 1rem 0 0.5rem;
      }

      .dropdown-base {
        background: $base;
        border: 1px solid $border-alt;
        box-shadow: $shadow-sm;
        padding: 0.5rem;
        border-radius: $default-radius;

        .link, .link:hover, .link:visited, .link:focus {
          border-bottom: none;
          display: block;
          padding: 0.5rem 1rem;
          background: $primary;
          color: $text-button;
          border-radius: $full-radius;

          &:not(:last-child) {
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }
</style>
