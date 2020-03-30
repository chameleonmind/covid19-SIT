<template>
  <div class="header-comp" :class="{'toggled': isSidebarToggled}">
    <basic-button color="text" class="p-0 ml-3 font-s-md" @click="toggleSidebar">
      <i class="icon-menu"></i>
    </basic-button>
    <h1>{{$appName}}</h1>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BasicButton from './common/basicButton'
import BasicDropdown from './common/dropdown'

export default {
  name: 'appHeader',
  data () {
    return {
      shareLinks: [
        {
          name: 'Facebook',
          icon: 'icon-facebook',
          url: 'https://www.facebook.com/sharer/sharer.php?u=https://covid19-sit.netlify.com/#/'
        },
        {
          name: 'Twitter',
          icon: 'icon-twitter',
          url: 'https://twitter.com/intent/tweet?hashtags=Covid19&original_referer=https://covid19-sit.netlify.com/&text=Pratite%20koliko%20dugo%20ste%20u%20izolaciji%20i%20vesti%20o%20dešavanjima%20u%20vezi%20sa%20Covid-19&url=https://covid19-sit.netlify.com/#/&via=dr_nekorektan'
        },
        {
          name: 'Email',
          icon: 'icon-mail',
          url: 'mailto:?subject=Covid-19 Aplikacija za praćenje izolacije'
        }
      ]
    }
  },
  components: {
    BasicDropdown,
    BasicButton
  },
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
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

    .share-menu {
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
