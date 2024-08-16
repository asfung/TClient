import Vue from 'vue'

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

const getScreenSize = () => {
  const width = window.innerWidth

  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  return 'xs'
}

const screenPlugin = {
  install(Vue) {
    const screen = Vue.observable({
      size: getScreenSize(),
    })

    const updateScreenSize = () => {
      screen.size = getScreenSize()
    }

    window.addEventListener('resize', updateScreenSize)

    Vue.mixin({
      computed: {
        $screen() {
          return screen
        },
        $isBreakpoint() {
          return (breakpoint) => {
            const currentWidth = breakpoints[screen.size]
            const breakpointWidth = breakpoints[breakpoint]
            return currentWidth >= breakpointWidth
          }
        }
      }
    })
  }
}

Vue.use(screenPlugin)
