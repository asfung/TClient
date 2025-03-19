<template>
  <!-- <NuxtPage class="dark:selection:bg-primaryDark selection:bg-primaryLight font-base" /> -->
  <v-layout class="rounded border font-base">
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item 
          v-if="$hasResource('resource-dashbord')"
          title="Dashboard" 
          value="dashboard"
          to="/dashboard"
          link
        ></v-list-item>
        
        <v-list-item 
          title="User" 
          value="user"
          to="/dashboard/user"
          link
        ></v-list-item>

        <v-list-group v-modal="isResourcesOpen" value="resources">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Resources"
              @click="resourcesEvent(item)"
            ></v-list-item>
          </template>

          <v-list-item 
            v-for="(item, index) in roles"
            :key="index"
            :title="item.name"
            :value="item.name"
            :to="navigateResource(item)"
            link
          ></v-list-item> 
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Application bar"></v-app-bar>

    <v-main class="d-flex align-center justify-center h-screen">
        <NuxtPage class="dark:selection:bg-primaryDark selection:bg-primaryLight " />
    </v-main>
  </v-layout>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { useResourceStore } from '~/stores/Resource'

const resourceStore = useResourceStore()
const colorMode = useColorMode()
const theme = useTheme()
const currentTheme = theme.global.current.value.dark
const isResourcesOpen = ref(false)
const { encryptURI } = useCryptoLocalStorage()

const roles = computed(() => resourceStore.roles)

watch(isResourcesOpen, (newValue) => {
  console.log('Resources dropdown is now:', newValue ? 'open' : 'closed')
})

const resourcesEvent = () => {
  // console.log('Resources item clicked!')
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

</script>

