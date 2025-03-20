<template>
  <div class="flex flex-col min-h-screen px-4 md:px-0 overflow-y-hidden scrollable">
    <div class="max-w-7xl mx-auto w-full py-6">
      <div class="grid grid-cols-1 md:grid-cols-[35rem_35rem] gap-6">
        <!-- resources -->
        <div class="p-6 rounded-lg">
          <div class="flex space-x-2">
            <h2 class="text-xl font-bold mb-4">Resources</h2>
            <button class="text-highlight" @click="showCreateResourceModal = true">New</button>
          </div>
          <v-progress-linear v-if="isLoadingResources" indeterminate
            class="text-center text-primaryLight dark:text-primaryDark"></v-progress-linear>
          <ul v-else class="space-y-2 max-h-[80vh] overflow-y-auto">
            <li
              v-for="resource in resources"
              :key="resource.id"
              @click="handleSelectResource(resource)"
              @contextmenu.prevent="showContextMenu($event, resource)"
              :class="[
                'p-2 rounded cursor-pointer hover:bg-primaryLight md:w-56 dark:hover:bg-primaryDark transition-colors',
                selectedResource?.id === resource.id ? 'dark:bg-primaryDark bg-primaryLight' : ''
              ]"
            >
              {{ resource.name }}
              <DashboardBadge
                class="cursor-pointer hover:bg-opacity-70 dark:hover:bg-opacity-40"
                @click.stop="handleToggleResource(resource)"
                v-model="resource.isExists"
                :label="['Unlocked', 'Locked']"
              />
            </li>
          </ul>
        </div>
        <!-- permissions -->
        <div class="p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Permissions</h2>
          <div v-if="selectedResource" class="space-y-4">
            <p class="mb-2">Permissions for: {{ selectedResource.name }}</p>
            <button class="text-highlight" @click="showCreatePermissionModal = true">New</button>
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
                      <div class="flex">
                        <DashboardCheckBox v-model="permission.isExists" @click="handleTogglePermission(permission)" />
                        <div class="">
                          <p>Key : <span class="text-accentLight dark:text-accentDark transition-colors">{{
                              permission.key }}</span></p>
                        </div>
                      </div>
                      <div>
                        <p><span class="text-highlight">Endpoint Name</span> : {{ permission.endpoint }}</p>
                        <p><span class="text-highlight">Endpoint Url</span> : {{ permission.uri }}</p>
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

    <DashboardResourceModal
      v-model="showCreateResourceModal"
      @submit="handleResourceCreate"
    />

    <DashboardResourceModal
      v-model="showEditResourceModal"
      :is-edit-mode="true"
      :initial-data="resourceToEdit"
      title="Edit Resource"
      submit-text="Save Changes"
      @submit="handleResourceUpdate"
      @delete="handleResourceDelete"
    />

    <DashboardPermissionModal
      v-model="showCreatePermissionModal"
      :resource-id="selectedResource?.id"
      @submit="handlePermissionCreate"
    />

    <DashboardContextMenu
      :visible="isContextMenuVisible"
      :x="contextMenuX"
      :y="contextMenuY"
      :menu-items="contextMenuItems"
      @action="handleContextAction"
      @close="hideContextMenu"
    />
  </div>
</template>

<script setup>
import { useResourceStore } from '~/stores/Resource'

const isContextMenuVisible = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextMenuItems = ref([
  { label: 'Edit', action: 'edit' },
  { label: 'Delete', action: 'delete' },
])

const route = useRoute()
const { decryptURI } = useCryptoLocalStorage()
const resourceStore = useResourceStore()
const [name, id] = route.params.role.split('_')
const role = {
  id: id,
  name: name
}
const selectedResource = ref(null) 
const resourceToEdit = ref(null) 
const isLoadingResources = ref(false)
const isLoadingPermissions = ref(false)
const expandedPanels = ref([])
const showCreateResourceModal = ref(false) 
const showEditResourceModal = ref(false) 
const showCreatePermissionModal = ref(false)
const showEditPermissionModal = ref(false)

const resources = computed(() => resourceStore.resourcesAll)
const permissions = computed(() => resourceStore.permissionsAll)

const handleSelectResource = async (resource) => {
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
  try {
    const payload = formData
    await resourceStore.createResource(role.id, payload)
  } finally {
    showCreateResourceModal.value = false
  }
}
const handleResourceUpdate = async (formData) => {
  try {
    const payload = formData
    await resourceStore.updateResource(role.id, payload)
  } finally {
    showEditResourceModal.value = false
  }
}
const handleResourceDelete = async (formData) => {
  try {
    const payload = formData
    // await resourceStore.deleteResource(role.id, payload)
  } finally {
    showEditResourceModal.value = false
  }
}

const handlePermissionCreate = async (formData) => {
  try {
    const payload = {
      key: formData.key,
      name: formData.name,
      endpoint: formData.endpoint
    }
    await resourceStore.createPermission(formData.resourceId, role.id, payload)
    await handleSelectResource(selectedResource.value)
  } finally {
    showCreatePermissionModal.value = false
  }
}

const handlePermissionUpdate = async (formData) => {
  try {
    const payload = {
      key: formData.key,
      name: formData.name,
      endpoint: formData.endpoint
    }
    // await resourceStore.updatePermission(role.id, formData.resourceId, payload)
    await handleSelectResource(selectedResource.value) 
  } finally {
    showEditPermissionModal.value = false
  }
}

const handlePermissionDelete = async (formData) => {
  try {
    // await resourceStore.deletePermission(role.id, formData.resourceId, formData)
    await handleSelectResource(selectedResource.value) 
  } finally {
    showEditPermissionModal.value = false
  }
}

const handleToggleResource = async (resource) => {
  await resourceStore.toggleRoleResource(role.id, {
    resource_id: resource.id
  })
}
const handleTogglePermission = async (permission) => {
  await resourceStore.toggleRolePermission(permission.resource_id, role.id, {
    permission_id: permission.id
  })
}

const showContextMenu = (event, resource) => {
  resourceToEdit.value = resource
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  const menuWidth = 150
  const menuHeight = 100
  if (contextMenuX.value + menuWidth > window.innerWidth) {
    contextMenuX.value = window.innerWidth - menuWidth
  }
  if (contextMenuY.value + menuHeight > window.innerHeight) {
    contextMenuY.value = window.innerHeight - menuHeight
  }
  isContextMenuVisible.value = true
}

const hideContextMenu = () => {
  isContextMenuVisible.value = false
}

const handleContextAction = async (action) => {
  const resource = resourceToEdit.value
  if (!resource) return

  try {
    switch (action) {
      case 'edit':
        showEditResourceModal.value = true
        break
      case 'delete':
        console.log('Delete resource:', resource)
        break
    }
  } finally {
    hideContextMenu()
  }
}

onMounted(async () => {
  isLoadingResources.value = true
  try {
    await resourceStore.getResourcesResources({
      roleId: role.id,
      mode: 'all'
    })
    if (resources.value?.length > 0) {
      handleSelectResource(resources.value[0])
    }
  } finally {
    isLoadingResources.value = false
  }
})
</script>

<style scoped>
.v-tooltip > ::v-deep(.v-overlay__content) {
  background: #FFD166;
}
</style>