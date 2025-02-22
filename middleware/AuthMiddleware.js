import { useAuthStore } from "~/stores/Auth";
import { Credentials } from "~/enums/Credentials"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  const token = authStore.getCredentials(Credentials.TOKEN)
  const user = authStore.getCredentials(Credentials.USER)

  console.log(`from: ${from.fullPath}, to: ${to.fullPath}`)
  if (!token && !user && !['/login', '/register'].includes(to.path)) {
    return navigateTo('/login');
  }

  if (token && user && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/');
  }

})