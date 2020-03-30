<template>
  <div id="app" class="app-view theme-default">
    <header class="app-header">
      <app-header/>
    </header>
    <aside class="app-sidebar" :class="{'toggled': isSidebarToggled}">
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
        v0.3.0 | Miloš Milošević, 2020.
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

const ROOT_PATH = 'https://covid19-sit.netlify.com'

export default {
  data () {
    return {
      isMobile: false,
      logo: ROOT_PATH + require('./assets/cover.png')
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
  },
  metaInfo () {
    return {
      meta: [
        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:title',
          content: 'Covid19 - Self Isolation Tracking'
        },
        {
          name: 'twitter:description',
          content: 'Pratite koliko dugo ste u izolaciji i vesti o dešavanjima u vezi sa Covid-19'
        },
        {
          name: 'twitter:image',
          content: this.logo
        },
        // Facebook OpenGraph
        {
          property: 'og:title',
          content: 'Covid19 - Self Isolation Tracking'
        },
        {
          property: 'og:site_name',
          content: 'Covid-19 SIT'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:image',
          content: this.logo
        },
        {
          property: 'og:description',
          content: 'Pratite koliko dugo ste u izolaciji i vesti o dešavanjima u vezi sa Covid-19'
        },
        {
          property: 'og:url',
          content: ROOT_PATH
        }
      ]
    }
  }
}
</script>
<style src="./assets/css/main.scss" lang="scss"></style>
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
