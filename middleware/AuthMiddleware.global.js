import { useAuthStore } from "~/stores/Auth";
import { Credentials } from "~/enums/Credentials"
import { useResourceStore  } from "~/stores/Resource";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { getItem } = useCryptoLocalStorage()
  const resourceStore = useResourceStore()
  const nuxtApp = useNuxtApp()

  const token = authStore.getCredentials(Credentials.TOKEN)
  const user = authStore.getCredentials(Credentials.USER)
  const resources = getItem('resources')

  // console.log(`from: ${from.fullPath}, to: ${to.fullPath}`)
  if (!token && !user && !['/login', '/register'].includes(to.path)) {
    return navigateTo('/login');
  }

  if (token && user && !resources) {
    resourceStore.getResources()
  }

  if (token && user && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/');
  }

})