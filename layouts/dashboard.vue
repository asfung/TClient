<template>
  <!-- <NuxtPage class="dark:selection:bg-primaryDark selection:bg-primaryLight font-base" /> -->
  <v-layout class="rounded border font-base">
    <v-navigation-drawer color="neutral">
      <v-list nav :ripple="false">
        <v-list-item 
          v-if="$hasResource('resource-dashboard')"
          title="Dashboard" 
          value="dashboard"
          to="/dashboard"
          link
          :ripple="false"
        ></v-list-item>
        
        <v-list-item 
          title="User" 
          value="user"
          to="/dashboard/user"
          link
          :ripple="false"
        ></v-list-item>

        <v-list-group v-modal="isResourcesOpen" value="resources">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Resources"
              @click="resourcesEvent(item)"
              :ripple="false"
            ></v-list-item>
          </template>

          <v-list-item 
            v-for="(item, index) in roles"
            :key="index"
            :title="item.name"
            :value="item.name"
            :to="`/dashboard/resources/${item.name}_${item.id}`"
            link
            :ripple="false"
          ></v-list-item> 
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      color="primary"
      elevation="1"
      >
      <template #title>
        Wassup, {{ resourceStore.resources?.role }}
      </template>
      <button @click="setColor($colorMode.preference === 'dark' ? 'light' : 'dark')" class="mx-4">
        <svg v-if="$colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center">
      <NuxtPage class="dark:selection:bg-primaryDark selection:bg-primaryLight " />
    </v-main>
  </v-layout>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useResourceStore } from '~/stores/Resource'
useHead({
  title: 'Dashboard | Talker'
})

const resourceStore = useResourceStore()
const colorMode = useColorMode()
const theme = useTheme()
const currentTheme = theme.global.current.value.dark
const isResourcesOpen = ref(false)
const { encryptURI } = useCryptoLocalStorage()
const { setColor } = useColorTheme()

const roles = computed(() => resourceStore.roles)

watch(isResourcesOpen, (newValue) => {
  console.log('Resources dropdown is now:', newValue ? 'open' : 'closed')
})

const resourcesEvent = () => {
  resourceStore.getRoles()
}

const navigateResource = (item) => {
  // `/dashboard/resources/${item.name}_${item.id}`
  // if (!item || !item.name || !item.id) return '/dashboard/resources';
  const stringifiedValue = JSON.stringify(item);
  const encryptedValue = encryptURI(stringifiedValue);
  return `/dashboard/resources/${encryptedValue}`;
};

onMounted(async () => {
  theme.global.name.value = colorMode.preference === 'light' ? 'light' : 'dark'
})

watch(() => colorMode.value, (newMode) => {
  theme.global.name.value = newMode
})


</script>

