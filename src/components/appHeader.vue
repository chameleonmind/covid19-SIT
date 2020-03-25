<template>
  <div class="header-comp" :class="{'toggled': isSidebarToggled}">
    <basic-button color="text" class="p-0 ml-3" @click="toggleSidebar">
      <i class="icon-menu"></i>
    </basic-button>
    <h1>Covid-19 Self-Isolation Tracker</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BasicButton from './common/basicButton'

export default {
  name: 'appHeader',
  components: { BasicButton },
  computed: {
    ...mapGetters('sidebar', ['isSidebarToggled'])
  },
  methods: {
    ...mapActions('sidebar', ['toggleSidebar'])
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .header-comp {
    background: $base;
    box-shadow: $shadow-sm;
    padding: 1rem;
    display: flex;
    align-items: center;
    transition: padding-left 0.3s ease;

    @media screen and (map_get($breakpoints, 'md')) {
      padding-left: 180px;

      &.toggled {
        padding-left: 80px;
      }
    }

    @media screen and (map_get($breakpoints, 'lg')) {
      padding-left: 220px;
    }

    h1 {
      font-size: 1rem;
      margin: 0;
      padding-left: 1rem;
      color: $text-alt;
    }
  }
</style>
