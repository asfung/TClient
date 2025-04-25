import { useResourceStore } from "~/stores/Resource"

export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp()

  if (to.path.startsWith('/dashboard')) {
    const hasAccess = nuxtApp.$hasResource('resource-dashboard')

    if (hasAccess) {
      setPageLayout('dashboard')
    } else {
      return navigateTo('/')
    }
  }
})