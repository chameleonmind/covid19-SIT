<template>
  <div id="app" class="app-view theme-default">
    <header class="app-header">
      <app-header/>
    </header>
    <aside class="app-sidebar">
      <app-sidebar/>
      <transition name="fade">
        <div class="backdrop" v-if="isSidebarToggled && isMobile" @click.stop="toggleSidebar"></div>
      </transition>
    </aside>
    <main class="app-main" :class="{'toggled': isSidebarToggled}">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
      <footer class="app-footer">
        Miloš Milošević, 2020.
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

export default {
  data () {
    return {
      isMobile: false
    }
  },
  mounted () {
    this.checkIfResolutionMobile()
    window.addEventListener('resize', this.checkIfResolutionMobile)
  },
  components: {
    AppSidebar,
    AppHeader
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarToggled'])
  },
  methods: {
    ...mapActions('sidebar', ['toggleSidebar']),
    checkIfResolutionMobile () {
      this.isMobile = window.innerWidth < 1024
    }
  }
}
</script>
<style scoped lang="scss">
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
