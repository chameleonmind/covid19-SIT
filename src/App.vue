<template>
  <div id="app" class="app-view theme-default">
    <div class="ie-cover" v-if="isIE">
      <p>Sorry, you are using an unsupported browser.</p>
    </div>
    <header class="app-header">
      <app-header v-if="getAppearance === 'dashboard'"/>
      <app-header-with-navigation v-else/>
    </header>
    <aside v-if="getAppearance === 'dashboard'" class="app-sidebar" :class="{'toggled': isSidebarToggled}">
      <app-sidebar/>
      <transition name="fade">
        <div class="backdrop" v-if="isSidebarToggled && isMobile" @click.stop="toggleSidebar"></div>
      </transition>
    </aside>
    <main class="app-main" :class="{'toggled': isSidebarToggled, 'no-sidebar': getAppearance !== 'dashboard'}">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      <footer class="app-footer">
        v1.0.5 | <a href="https://badinsoft.com" target="_blank">Badin Soft</a>, 2020.
      </footer>
    </main>
    <notification/>
    <message/>
  </div>
</template>
<script>
import AppHeader from './components/appHeader'
import AppSidebar from './components/appSidebar'
import { mapGetters, mapActions } from 'vuex'
import AppHeaderWithNavigation from './components/appHeaderWithNavigation'

export default {
  data () {
    return {
      isMobile: false,
      isIE: false
    }
  },
  mounted () {
    this.checkIfResolutionMobile()
    this.checkIfIE()
    window.addEventListener('resize', this.checkIfResolutionMobile)
  },
  components: {
    AppHeaderWithNavigation,
    AppSidebar,
    AppHeader
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarToggled']),
    ...mapGetters('appearance', ['getAppearance'])
  },
  methods: {
    ...mapActions('sidebar', ['toggleSidebar']),
    checkIfResolutionMobile () {
      this.isMobile = window.innerWidth < 1024
    },
    checkIfIE () {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf('MSIE ')

      if (msie > 0 || !!navigator.userAgent.match(/Trident/)) { // If Internet Explorer, return version number {
        this.isIE = true
      }
    }
  }
}
</script>
<style src="./assets/css/main.scss" lang="scss"></style>
<style scoped lang="scss">
  .ie-cover {
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color: #242832;
    color: #ececec;
    z-index: 9999;
    text-align: center;
    padding-top: 25%;
  }
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: -1;
  }
</style>
