<template>
  <div class="comp-sidebar" :class="{'toggled': isSidebarToggled}">
    <div class="logo">
      <img src="../assets/logo.png" alt="SIT">
      <h1 class="app-name" :class="{'visible' : !isSidebarToggled || isMobile}">Covid-19 SIT</h1>
    </div>
    <nav class="sidebar-nav">
      <router-link id="menu-home"
                   class="menu-item"
                   to="/"
                   v-tooltip="{placement: 'right', content: 'Početna'}">
        <i class="icon-home"></i>
        <span class="menu-item__text">Početna</span>
      </router-link>
      <!--<router-link id="menu-about"
                   class="menu-item"
                   to="/about"
                   v-tooltip="{placement: 'right', content: 'About'}">
        <i class="icon-info"></i>
        <span class="menu-item__text">About</span>
      </router-link>-->
    </nav>
    <div class="sidebar-footer">
      <router-link class="menu-item"
                   v-tooltip="{placement: 'right', content: 'Podešavanja'}"
                   to="/settings">
        <i class="icon-settings"></i>
      </router-link>
      <basic-button color="text"
                    @click="toggleSidebar"
                    v-tooltip="{placement: 'right', content: isSidebarToggled ? 'Proširi' : 'Skupi'}">
        <i class="icon-chevrons-right" v-if="isSidebarToggled && !isMobile"></i>
        <i class="icon-chevrons-left" v-else></i>
      </basic-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BasicButton from './common/basicButton'

export default {
  name: 'appSidebar',
  data () {
    return {
      isMobile: false
    }
  },
  mounted () {
    this.checkIfResolutionMobile()
    window.addEventListener('resize', this.checkIfResolutionMobile)
  },
  components: { BasicButton },
  computed: {
    ...mapGetters('sidebar', ['isSidebarToggled'])
  },
  methods: {
    ...mapActions('sidebar', ['toggleSidebar']),
    checkIfResolutionMobile () {
      this.isMobile = window.innerWidth < 1024
    }
  },
  watch: {
    $route: {
      handler () {
        if (this.isMobile && this.isSidebarToggled) {
          const tempTimeout = setTimeout(() => {
            this.toggleSidebar()
            clearTimeout(tempTimeout)
          }, 300)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .comp-sidebar {
    height: 100%;
    background: $menu-background;
    border-right: 1px solid $border;
    display: flex;
    flex-direction: column;
    width: 0;
    overflow: hidden;
    transition: width 0.3s ease, transform 0.3s ease;

    &.toggled {
      width: 280px;
    }

    @media screen and (map_get($breakpoints, 'md')) {
      width: 180px;

      &.toggled {
        width: 80px;
      }
    }
    @media screen and (map_get($breakpoints, 'lg')) {
      width: 220px;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      padding: $menu-padding;

      .menu-item {
        appearance: none;
        border: none;
        cursor: pointer;
        text-align: left;
        background: $menu-selected-alt;
        border-radius: $menu-item-radius;
        outline: none;
        color: $menu-text;
        padding: 0.75rem 1rem;
        margin-top: .5rem;
        text-decoration: none;
        display: block;
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        transition: padding-left .2s, background-color .2s;

        &::before {
          position: absolute;
          content: '';
          width: 0.5rem;
          height: 0.5rem;
          left: 0.25rem;
          border-radius: 1rem;
          top: 50%;
          transform: translate(-100%, -50%);
          background: transparent;
          transition: background-color 0.3s, transform 0.3s;
        }

        i {
          margin-left: 0;
          transition: margin-left 0.3s;
        }

        &.router-link-active::before {
          background-color: transparent;
          transition: background-color .2s;
        }

        &.has-menu {
          display: flex;

          .chevron {
            margin-left: auto;
            margin-right: 0.5rem;
            transition: transform .2s;
          }
        }

        &.router-link-exact-active, &.open {
          background: $menu-selected;
          color: $menu-selected-text;
          font-weight: bold;
          padding-left: 1.25rem;
        }

        &.router-link-exact-active.has-menu, &.open {
          border-radius: $menu-item-radius $menu-item-radius 0 0;
        }

        &.router-link-exact-active::before {
          transform: translate(0, -50%);
          background: $menu-selector;
        }

        &__text {
          margin-left: 0.75rem;
          position: static;
          transition: visibility 0.3s 0.3s, opacity 0.3s 0.3s;
        }
      }

      & .menu-item + .submenu {
        overflow: hidden;
        border-radius: 0 0 $menu-item-radius $menu-item-radius;
        background: $menu-selected;
        height: 0;
        visibility: hidden;

        & .menu-item {
          padding-left: 0;
          opacity: 0;
          white-space: nowrap;
          transition: padding-left .2s, opacity .2s, display .2s;

          &:not(:last-child) {
            border-radius: 0;
          }

          &:last-child {
            border-radius: 0 0 $menu-item-radius $menu-item-radius;
          }

          &:nth-child(1) {
            transition-delay: .1s;
          }

          &:nth-child(2) {
            transition-delay: .15s;
          }

          &:nth-child(3) {
            transition-delay: .2s;
          }

          &:nth-child(4) {
            transition-delay: .25s;
          }

          &:nth-child(5) {
            transition-delay: .3s;
          }

          &:nth-child(6) {
            transition-delay: .35s;
          }
        }
      }

      & .menu-item.open {
        & + .submenu {
          height: auto;
          visibility: visible;

          .menu-item {
            padding-left: 1.5rem;
            opacity: 1;
          }
        }
      }

      .menu-item.open .chevron {
        padding-left: 0;
        transform: rotate(0.25turn);
      }
    }

    &.toggled {
      .menu-item i {
        margin-left: 0.25rem;
        transition: margin-left 0.3s 0.3s;
      }

      @media screen and (map_get($breakpoints, 'md')) {
        .menu-item__text {
          visibility: hidden;
          opacity: 0;
          width: 0 !important;
          transition: visibility 0.1s, opacity 0.1s, width 0.2s;
        }
      }
    }
  }

  .sidebar-footer {
    border-top: 1px solid $border;
    background: $menu-selected-alt;
    color: $menu-text;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color .3s;

    .menu-item, .menu-item:visited {
      color: inherit;
      padding: 0.5rem;

      i {
        margin-left: 0;
      }
    }
  }

  .comp-sidebar.toggled .sidebar-footer .menu-item i {
    margin: auto;
  }

  .logo {
    max-width: 100%;
    padding: 0 0.5rem 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    border-bottom: 1px solid $border-alt;

    img {
      display: inline-block;
      width: 4rem;
      max-width: 100%;
    }

    .app-name {
      color: $primary;
      font-size: 1rem;
      white-space: nowrap;
      margin: 0;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;

      &.visible {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s 0.3s, visibility 0.3s 0.3s;
      }
    }
  }
</style>
