import { useResourceStore } from "~/stores/Resource"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    console.log('acl PLugin ✅')
  })
  const resourceStore = useResourceStore()
  const resources = resourceStore.resourcesResource
  const permissions = resourceStore.resourcesPermission

  const hasResource = (value) => {
    return resources.includes(value)
  }

  const hasPermission = (value) => {
    return permissions.includes(value)
  }

  return {
    provide: {
      hasResource,
      hasPermission
    }
  }

})