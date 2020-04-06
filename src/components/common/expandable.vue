<template>
  <div class="expandable" :class="{expanded: $props.expanded}">
    <div class="expandable__title" @click.prevent="toggleExpandableElement">
      <i class="icon-chevron-right"></i>
      <h4>
        {{title}}
        <transition name="fade" mode="out-in">
          <span class="badge" v-if="badge || badge === 0 || badge === '0'">{{badge}}</span>
        </transition>
      </h4>
    </div>
    <div class="expandable__content-wrapper"
         :style="{height: elementHeight+'px'}"
         :class="{expanded: $props.expanded, 'overflow-visible': $props.overflowVisible}">
      <div class="expandable__content" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'expandable',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Expandable element'
    },
    expanded: {
      type: Boolean,
      required: true,
      default: false
    },
    badge: {
      default: ''
    },
    defaultHeight: {
      type: Number,
      default: 0
    },
    overflowVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      elementHeight: this.$props.defaultHeight || 0
    }
  },
  mounted () {
    this.calculateElementHeight()
  },
  computed: {
    // elementHeight () {
    //   return (this.$props.expanded && this.elementLoaded) ? this.$refs.content.getBoundingClientRect().height : 0
    //   // return this.$props.expanded ? '100' : 0
    // },
    elementLoaded () {
      return this.$refs.content
    },
    badgeStringified () {
      return this.$props.badge.toString()
    }
  },
  methods: {
    toggleExpandableElement () {
      this.$emit('toggle', !this.$props.expanded)
      this.calculateElementHeight()
      // this.expanded = !this.expanded
    },
    calculateElementHeight () {
      this.$nextTick(() => {
        this.elementHeight = this.$props.expanded ? this.$refs.content.getBoundingClientRect().height + 20 : 0
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .expandable {
    width: 100%;
    margin-bottom: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: $text-alt;
      margin: 1rem 0;
      transition: color 0.2s;
      position: relative;

      i {
        transition: transform 0.2s;
      }

      h4 {
        margin: 0 0 0 0.25rem;
        display: flex;
        align-items: center;
        flex: 1 1 auto;
        font-size: 0.8rem;
        text-transform: uppercase;

        &::after {
          flex: 1 1 auto;
          content: '';
          border-bottom: 1px solid $border-alt;
          margin-right: auto;
          margin-left: 1rem;
        }
      }

      .badge {
        margin-left: 0.5rem;
        margin-right: -0.25rem;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $primary;
        border-radius: 50px;
        color: $text-button;
      }
    }

    &:not(.expanded) {
      .expandable__title {
        &:hover {
          color: $text-alt2;

          i {
            transform: translateX(0.15rem);
          }
        }
      }
    }

    &.expanded {
      i {
        transform: rotate(90deg);
      }
    }

    &__content-wrapper {
      overflow-y: hidden;
      visibility: hidden;
      opacity: 0;
      transition: height 0.3s 0.3s cubic-bezier(1, 0, 0, 1);

      &.overflow-visible {
        overflow: visible;
      }

      .expandable__content {
        opacity: 0;
        transition: opacity 0.3s;
      }

      &.expanded {
        visibility: visible;
        opacity: 1;
        transition: height 0.3s cubic-bezier(1, 0, 0, 1);

        .expandable__content {
          padding: 2px 0;
          transition: opacity 0.3s 0.3s, overflow 0.1s;
          opacity: 1;
        }
      }
    }
  }
</style>
