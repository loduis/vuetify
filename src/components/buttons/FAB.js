import Button from './Button'

export default {
  name: 'fab',

  extends: Button,

  data: () => ({
    changeTimeout: {},
    isChanging: false
  }),

  props: {
    absolute: Boolean,
    lateral: Boolean,
    positionX: [Number, String],
    positionY: [Number, String],
    hidden: Boolean,
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    left: Boolean,
    floating: {
      default: true
    },
    raised: {
      default: true
    }
  },

  computed: {
    fabClasses () {
      return {
        'fab': true,
        'fab--absolute': this.absolute,
        'fab--hidden': this.hidden,
        'fab--is-changing': this.isChanging,
        'fab--top': this.top,
        'fab--right': this.right,
        'fab--bottom': this.bottom,
        'fab--left': this.left
      }
    }
  },

  methods: {
    changeAction () {
      this.isChanging = true
      clearTimeout(this.changeTimeout)
      this.changeTimeout = setTimeout(() => {
        requestAnimationFrame(() => (this.isChanging = false))
      }, 600)
    },
    genFabContent (h) {
      return h('div', { 'class': 'fab__activator' }, [this.genButton(h)])
    },
    genButton (h) {
      const { tag, data } = this.generateRouteLink()
      const children = []

      if (tag === 'button') {
        data.attrs.type = this.type
      }

      const icon = h('v-icon', [this.$slots.default])
      const content = h('div', { 'class': 'fab__content' }, [icon])

      children.push(content)

      if (this.loading) {
        children.push(this.genLoader(h))
      }

      return h(tag, data, children)
    }
  },

  render (h) {
    return h('div', {
      'class': this.fabClasses
    }, [this.genFabContent(h)])
  }
}
