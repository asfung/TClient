import { useAuthStore } from "~/stores/Auth";
import { Credentials } from "~/enums/Credentials"
import { useResourceStore  } from "~/stores/Resource";
import { useTagStore } from "~/stores/Tag";

export default defineNuxtRouteMiddleware((to, from) => {
  const nuxtApp = useNuxtApp()

  const authStore = useAuthStore()
  const resourceStore = useResourceStore()
  const tagStore = useTagStore()

  const { getItem } = useCryptoLocalStorage()
  const {
    tags,
    mentions,
    hashtags
  } = storeToRefs(tagStore)

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

  if(token && user && tags.value === null){
    tagStore.getTags()
  }

  if (token && user && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/');
  }

})