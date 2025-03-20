<template>
  <div class="flex flex-col min-h-screen px-4 md:px-0 overflow-y-hidden scrollable">
    <div class="max-w-7xl mx-auto w-full py-6">
      <div class="grid grid-cols-1 md:grid-cols-[35rem_35rem] gap-6">
        <!-- resources-->
        <div class="p-6 rounded-lg">
          <div class="flex space-x-2">
            <h2 class="text-xl font-bold mb-4">Resources</h2>
            <v-menu>
              <template v-slot:activator="{ props: menu }">
                <v-tooltip location="top" color="primary">
                  <template v-slot:activator="{ props: tooltip }">
                    <button class="text-highlight" v-bind="mergeProps(menu, tooltip)">
                      Add
                    </button>
                  </template>
                  <p class="font-base text-primary">Add the Resource to {{ role.name }}</p>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in resources" :key="index" :value="index" :disabled="item.isExists">
                  <v-list-item-title @click="console.log(item)"
                    :class="{ 'font-base-bold': !item.isExists, 'line-through': item.isExists }">{{ item.name
                    }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <button class="text-highlight" @click="showResourceModal = true">New</button>
          </div>


          <v-progress-linear v-if="isLoadingResources" indeterminate
            class="text-center text-primaryLight dark:text-primaryDark"></v-progress-linear>
          <ul v-else class="space-y-2 max-h-[80vh] overflow-y-auto">
            <li v-for="resource in resources" :key="resource.id" @click="selectResource(resource)" :class="[
                'p-2 rounded cursor-pointer hover:bg-primaryLight md:w-56 dark:hover:bg-primaryDark transition-colors',
                selectedResource?.id === resource.id ? 'dark:bg-primaryDark bg-primaryLight' : ''
              ]">
              {{ resource.name }}
              <DashboardBadge class="cursor-pointer hover:bg-opacity-70 dark:hover:bg-opacity-40"
                @click.stop="handleToggleResource(resource)" v-model="resource.isExists" :label="['Unlocked', 'Locked']" />
            </li>
          </ul>
        </div>
        <!--permissions -->
        <div class="p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Permissions</h2>
          <div v-if="selectedResource" class="space-y-4">
            <p class="mb-2">Permissions for: {{ selectedResource.name }}</p>
            <v-progress-linear v-if="isLoadingPermissions" indeterminate
              class="text-center text-primaryLight dark:text-primaryDark"></v-progress-linear>
            <div v-else-if="permissions.length === 0" class="text-gray-500">
              <p>No permissions available for this resource</p>
            </div>
            <div v-else class="space-y-2 max-h-[80vh] overflow-y-auto scrollable">
              <v-expansion-panels :ripple="false" v-model="expandedPanels" multiple>
                <v-expansion-panel v-for="(permission, index) in permissions" :key="permission" :value="index"
                  elevation="0">
                  <template #title>
                    <DashboardBadge v-model="permission.isExists" />
                    {{ permission.name }}
                  </template>
                  <template #text>
                    <div class="">
                      <!-- <code>*Make Sure its Matching on Api Route</code> -->
                      <div class="flex">
                        <DashboardCheckBox v-model="permission.isExists" />
                        <div class="">
                          <p>Key : <span class="text-accentLight dark:text-accentDark transition-colors">{{
                              permission.key }}</span></p>
                        </div>
                      </div>
                      <div>
                        <p><span class="text-highlight">Endpoint Name</span>&nbsp;:{{ permission.endpoint }}</p>
                        <p><span class="text-highlight">Endpoint Url</span>&nbsp;:{{ permission.uri }}</p>
                      </div>
                    </div>
                  </template>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>
          <div v-else class="text-gray-500 flex items-center h-full">
            <p class="w-full text-center">Select a resource to view permissions</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <DashboardResourceModal 
      v-model="showResourceModal"
      :initial-data="{}"
      :is-edit-mode="false"
      title="Create Resource"
      submit-text="Create"
      @submit="handleResourceCreate"
      /> -->

      <DashboardResourceModal
          v-model="showResourceModal"
          @submit="handleResourceCreate"
        />
  </div>
</template>

<script setup>
import { useResourceStore } from '~/stores/Resource'
import { mergeProps } from 'vue'

const items = [
    { title: 'Click Me 1' },
    { title: 'Click Me 2' },
    { title: 'Click Me 3' },
    { title: 'Click Me 4' },
  ]


const route = useRoute()
const { decryptURI } = useCryptoLocalStorage()
const resourceStore = useResourceStore()
// const role = decryptURI(route.params.role)
const [name, id] = route.params.role.split('_')
const role = {
  id: id,
  name: name
}
const selectedResource = ref(null)
const selectedResourceDetails = ref({})
const isLoadingResources = ref(false)    
const isLoadingPermissions = ref(false)  
const expandedPanels = ref([]) 

const showResourceModal = ref(false)

const resources = computed(() => resourceStore.resourcesAll)
const permissions = computed(() => resourceStore.permissionsAll)

const selectResource = async (resource) => {
  selectedResource.value = resource
  isLoadingPermissions.value = true
  try {
    await resourceStore.getResourcesPermissions({
      roleId: role.id,
      resourceId: resource.id
    })
    expandedPanels.value = permissions.value.map((_, index) => index)
  } finally {
    isLoadingPermissions.value = false
  }
}

const handleResourceCreate = async (formData) => {
  try{
    const payload = formData
    resourceStore.createResource(role.id, payload)
  }finally{
    showResourceModal = false
  }
}

const handleToggleResource = async (resource) => {
  resourceStore.toggleRoleResource(role.id, {
    resource_id: resource.id
  })
}


const test = () => {
  console.log('hello world')
  alert('Clicked!');
}

onMounted( async () => {
  isLoadingResources.value = true
  try {
    await resourceStore.getResourcesResources({
      roleId: role.id,
      mode: 'all'
    })
    if (resources.value?.length > 0) {
      selectResource(resources.value[0])
    }
  } finally {
    isLoadingResources.value = false
  }
})
</script>

<style scoped>
.v-tooltip> ::v-deep(.v-overlay__content) {
  background: #FFD166;
}

</style>