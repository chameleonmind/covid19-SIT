<template>
  <section class="info custom-scrollbar">
    <div class="entry" v-for="(content, idx) in information" :key="'content'+idx">
      <h3 class="title">{{content.name}}</h3>
      <div class="content">
        <template v-if="content.type === 'url'">
          <p v-for="(link, index) in content.data"
             :key="'link'+index"
             class="link">
            <a :href="link.url"
               class="font-bold"
               target="_blank">
              {{link.name}}
            </a>
            <span class="description">{{link.description}}</span>
          </p>
        </template>

        <template v-if="content.type === 'phone'">
          <p v-for="(link, index) in content.data"
             :key="'link'+index"
             class="link">
            <a :href="'tel:'+link.phone"
               class="font-bold"
               target="_blank">
              {{link.name}}
            </a>
            <span class="description">{{link.description}}</span>
          </p>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import info from '../dataSource/information'
import { mapGetters } from 'vuex'

export default {
  name: 'usefulInfo',
  computed: {
    ...mapGetters('language', ['getAppLanguage']),
    information () {
      return info[this.getAppLanguage]
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/css/themes/index';

  .info {
    display: flex;
    max-width: 100%;
    flex-wrap: wrap;
    max-height: 180px;
    overflow-y: auto;

    .entry {
      flex: 1 1 50%;
      padding: 0 0.5rem;

      .title {
        font-size: 1rem;
        margin: 0;
        color: $text-alt;
      }

      .content {
        padding: 1rem 0 0;
      }

      .link {
        display: block;
        margin: 0 0 0.5rem;
      }

      .description {
        display: block;
        margin: 0;
        color: $text-alt2;
        font-size: 0.85rem;
      }
    }
  }
</style>
