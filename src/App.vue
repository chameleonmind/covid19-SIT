<template>
  <div id="app" class="app-view theme-default">
    <header class="app-header">
      <app-header/>
    </header>
    <aside class="app-sidebar">
      <app-sidebar/>
    </aside>
    <main class="app-main" :class="{'toggled': isSidebarToggled}">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </main>
  </div>
</template>
<script>
import AppHeader from './components/appHeader'
import AppSidebar from './components/appSidebar'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppSidebar,
    AppHeader
  },
  computed: {
    ...mapGetters('sidebar', ['isSidebarToggled'])
  }
}
</script>
