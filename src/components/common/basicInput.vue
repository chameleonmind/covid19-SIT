<template>
  <div class="basic-input" :class="{'fixed-label' : !$props.floatingLabel, 'field-disabled' : $props.disabled}">
    <label v-if="$props.label"
           ref="label"
           :for="$props.id"
           :class="{'floating' : $props.floatingLabel, 'active' : !!this.value || this.inputActive || this.autofilled, 'required' : $props.required}">{{$props.label}}</label>
    <template v-if="$props.type !== 'textarea'">
      <input :type="$props.type ? $props.type : 'text'"
             ref="input"
             :id="$props.id"
             :value="value"
             :class="{'padding-right' : !!this.value && $props.clearable}"
             :name="$props.name"
             :required="required"
             :disabled="disabled"
             @keydown.esc="escapeButtonEvent"
             @focusin="inputActive = true"
             @focusout="inputActive = false"
             @input="updateValue"
             @blur.prevent="updateAndFocusOut"
             @animationstart="checkAnimation"/>
      <button v-if="!!this.value && $props.clearable && !$props.disabled"
              tabindex="-1"
              type="button"
              class="clear-button"
              @click.prevent="clearInput">
        <svg aria-hidden="true" viewBox="0 0 512 512">
          <path
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
        </svg>
      </button>
    </template>
    <template v-else>
      <textarea @focusin="inputActive = true"
                @focusout="inputActive = false"
                ref="input"
                :id="$props.id"
                :value="value"
                :name="$props.name"
                class="custom-scrollbar"
                :required="required"
                :disabled="disabled"
                @keydown.esc="escapeButtonEvent"
                @input="updateValue"
                @blur.prevent="updateAndFocusOut"
                :style="{'min-height': $props.minHeight + 'px'}"
                rows="2"></textarea>
    </template>
    <slot name="error">
      <p class="error">{{$props.errorMessage}}</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'basicInput',
  data () {
    return {
      inputValue: '',
      inputActive: false,
      autofilled: false
    }
  },
  props: {
    value: {
      required: true,
      default: ''
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    floatingLabel: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: null
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.$refs.input.value)
    },
    clearInput () {
      this.$refs.input.value = ''
      this.updateValue()
      this.$emit('clear')
    },
    updateAndFocusOut () {
      this.$emit('blur')
      this.inputActive = false
    },
    checkAnimation (e) {
      if (e.animationName === 'onAutoFillStart') {
        this.autofilled = true
      } else if (e.animationName === 'onAutoFillCancel') {
        this.autofilled = false
      }
    },
    escapeButtonEvent () {
      this.$emit('escape')
    },
    focusInput () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/themes/index';

  .basic-input {
    position: relative;

    &.fixed-label {
      padding-top: .5rem;

      .clear-button {
        top: calc(50% + 1rem);
      }
    }

    &.field-disabled {
      opacity: 0.4;

      label, input {
        cursor: not-allowed;
      }
    }

    label {
      display: block;
      font-weight: normal;
      color: inherit;
      cursor: pointer;
      position: relative;

      &.floating {
        position: absolute;
        font-weight: normal;
        transform: translateY(1.05rem) translateX(2px);
        padding-left: 0.5rem;
        padding-right: 20%;
        pointer-events: none;
        opacity: 0.5;
        transition: transform .2s, font-size 0.2s;

        @media (map_get($breakpoints, sm)) {
          padding-right: 50%;
        }

        &.active {
          font-weight: normal;
          font-size: 0.75rem;
          color: $text-alt2;
          opacity: 1;
          padding-top: 0.25rem;
          transform: translateY(1px) translateX(2px);

          ~ textarea, ~ input {
            background: $input-bg;
            box-shadow: $input-shadow;
          }
        }
      }

      &.required:after {
        content: '*';
        font-size: 1.1em;
        color: $danger;
      }
    }

    input, textarea {
      display: block;
      width: 100%;
      border-radius: $input-radius;
      border: none;
      background: $input-bg;
      color: $text;
      padding: 1.5rem 0.5rem 0.5rem;
      outline: none;
      resize: none;
      transition: border-color .2s, box-shadow .2s;

      &:focus {
        box-shadow: $input-shadow;
        background: $input-bg;
        outline: none;
      }

      &.padding-right {
        padding-right: 2.5rem;
      }
    }

    .clear-button {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      transform: translateY(10%);
      appearance: none;
      border: none;
      outline: none;
      cursor: pointer;
      background: transparent;
      color: $text-button;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1rem;
      height: 1rem;
      padding: 0;
      opacity: 0.5;
      transition: opacity .2s;

      &:hover {
        opacity: 0.75;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: $secondary;
      }
    }

    &.input-error {
      input {
        border: 1px solid $danger;
      }
    }

    p.error {
      position: absolute;
    }
  }
</style>
