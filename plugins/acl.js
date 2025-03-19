import { useResourceStore } from "~/stores/Resource"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    console.log('acl PLugin ✅')
  })
  const resourceStore = useResourceStore()
  const resources = computed(() => resourceStore.resources)

  const hasResource = (value) => {
    const resourceList = resources.value?.resources || [];
    return Array.isArray(resourceList) && resourceList.includes(value);
  }

  const hasPermission = (value) => {
    const permissionList = resources.value?.permissions || [];
    return Array.isArray(permissionList) && permissionList.includes(value);
  }

  return {
    provide: {
      hasResource,
      hasPermission
    }
  }

})