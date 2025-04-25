import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
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

  const screen = ref({
    size: getScreenSize(),
  })

  const updateScreenSize = () => {
    screen.value.size = getScreenSize()
  }

  window.addEventListener('resize', updateScreenSize)

  nuxtApp.provide('screen', screen)
  nuxtApp.provide('isBreakpoint', (breakpoint) => {
    // const currentWidth = breakpoints[screen.value.size]
    // const breakpointWidth = breakpoints[breakpoint]
    // return currentWidth >= breakpointWidth
    if (Array.isArray(breakpoint)) {
      return breakpoint.includes(screen.value.size)
    } else {
      const currentWidth = breakpoints[screen.value.size]
      const breakpointWidth = breakpoints[breakpoint]
      return currentWidth >= breakpointWidth
    }
  })
  nuxtApp.hook('app:mounted', () => {
    console.log('Screen PLugin ✅')
  })
})