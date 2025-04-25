<template>
  <div class="w-full">
    <v-card>
      <v-card-title class="d-flex justify-between">
        <span>User Management</span>
        <v-btn color="primary" @click="openCreateDialog">Create User</v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="search" label="Search" @input="fetchUsers" clearable />

        <v-data-table-server
          :headers="headers"
          :items="users"
          :loading="loading"
          :items-length="pagination.total"
          :items-per-page="pagination.perPage"
          :page="pagination.page"
          @update:options="updateOptions"
          show-current-page
          :items-per-page-options="[15, 20]"
          >
          <!-- :items-per-page-options="[5, 10, 15, 20]" -->
          <template #item.profile_image="{ item }">
            <v-avatar size="36" v-if="item.profile_image">
              <v-img
                :src="$getImage(item.profile_image.key)"
                alt="Profile"
              />
            </v-avatar>
            <v-avatar size="36" v-else color="grey lighten-2">
              <v-img
                :src="$randomProfileImage(item.display_name)"
                alt="Profile"
              />
            </v-avatar>
          </template>

          <template #item.role.name="{ item }">
            <span>{{ item.role?.name || 'N/A' }}</span>
          </template>

          <template #item.actions="{ item }">
            <v-icon @click="openUpdateDialog(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="red" @click="deleteUser(item.id, item.username)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px" class="font-base">
      <v-card>
        <v-card-title>{{ isUpdating ? 'Update User' : 'Create User' }}</v-card-title>
        <v-card-text>
          <v-form ref="formRef" @submit.prevent="submitUser">
            <v-text-field
              v-model="form.display_name"
              label="Display Name"
              :rules="[v => !!v || 'Display Name is required']"
            />
            <v-text-field
              v-model="form.username"
              label="Username"
              :rules="[v => !!v || 'Username is required']"
            />
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
            />
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              :rules="isUpdating ? [] : [v => !!v || 'Password is required']"
            />
            <v-select
              v-model="form.role_id"
              :items="roles"
              item-title="name"
              item-value="id"
              label="Role"
              :rules="[v => !!v || 'Role is required']"
            />
            <v-checkbox
              v-model="form.banned"
              label="Banned"
              hide-details
            />
            <v-text-field
              v-model="form.badge"
              label="Badge"
              clearable
              hint="Optional badge for user"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="submitUser">
            {{ isUpdating ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DashboardDeleteConfirmation
      v-model="showDeleteConfirm"
      :name="deleteUserName"
      :loading="isSubmitting"
      @confirm="handlePostDelete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '~/stores/User'
import { useResourceStore } from '~/stores/Resource'

const userStore = useUserStore()
const resourceStore = useResourceStore()

const headers = [
  { title: 'Profile', key: 'profile_image', sortable: false },
  { title: 'Display Name', key: 'display_name' },
  { title: 'Username', key: 'username' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role.name' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const users = ref([])
const roles = ref([])
const loading = ref(false)
const search = ref('')
const dialog = ref(false)
const isUpdating = ref(false)
const formRef = ref(null)

// delete confirm dialog for useer
const showDeleteConfirm = ref(false)
const deleteUserId = ref(null)
const deleteUserName = ref('')
const isSubmitting = ref(false)

const form = reactive({
  id: null,
  display_name: '',
  username: '',
  email: '',
  password: '',
  role_id: null,
  banned: false,
  badge: null,
})

const pagination = reactive({
  page: 1,
  perPage: 15,
  total: 0,
})

async function fetchUsers() {
  loading.value = true
  try {
    const payload = {
      page: pagination.page,
      per_page: pagination.perPage,
      search: search.value,
    }
    const res = await userStore.getUserPaginate(payload)

    if (res.status === 200 && Array.isArray(res.response?.data?.data)) {
      users.value = res.response.data.data
      pagination.total = res.response.data.meta.total
      pagination.page = res.response.data.meta.current_page
      pagination.perPage = res.response.data.meta.per_page
    } else {
      users.value = []
      pagination.total = 0
    }
  } catch (error) {
    users.value = []
    pagination.total = 0
  } finally {
    loading.value = false
  }
}

function updateOptions({ page, itemsPerPage }) {
  pagination.page = page
  pagination.perPage = itemsPerPage === -1 ? pagination.total : itemsPerPage
  fetchUsers()
}

async function loadRoles() {
  if (roles.value.length > 0) return
  try {
    const res = await resourceStore.getRoles()
    if (res.status === 200) {
      roles.value = Array.isArray(res.data?.data) ? res.data.data : []
    } else {
      roles.value = []
    }
  } catch (e) {
    roles.value = []
    console.log(e)
  }
}

async function openCreateDialog() {
  try {
    isUpdating.value = false
    await loadRoles()
    Object.assign(form, {
      id: null,
      display_name: '',
      username: '',
      email: '',
      password: '',
      role_id: null,
      banned: false,
      badge: null,
    })
    dialog.value = true
  } catch (e) {
    console.log(e)
  }
}

async function openUpdateDialog(user) {
  try {
    isUpdating.value = true
    await loadRoles()
    Object.assign(form, { 
      ...user, 
      password: '',
      banned: !!user.banned, 
      badge: user.badge || null,
    })
    dialog.value = true
  } catch (e) {
    console.log(e)
  }
}

async function submitUser() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  try {
    const payload = { ...form }
    const res = isUpdating.value
      ? await userStore.updateUserTable(payload, form.id)
      : await userStore.createUser(payload)

    if (res.status === 200 || res.status === 201) {
      dialog.value = false
      await fetchUsers()
    } else {
      console.error('res:', res)
    }
  } catch (e) {
    console.log(e)
  }
}

async function deleteUser(id, username) {
  deleteUserId.value = id
  deleteUserName.value = username
  showDeleteConfirm.value = true
}

async function handlePostDelete() {
  if (!deleteUserId.value) return
  isSubmitting.value = true
  try {
    const res = await userStore.deleteUser({}, deleteUserId.value)
    if (res.status === 200) {
      showDeleteConfirm.value = false
      await fetchUsers()
    } else {
      console.error('res:', res)
    }
  } catch (e) {
    console.log(e)
  } finally {
    isSubmitting.value = false
    deleteUserId.value = null
    deleteUserName.value = ''
  }
}

onMounted(async () => {
  await Promise.all([fetchUsers(), loadRoles()])
})
</script>


<style scoped>
/* .v-table .v-data-table-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}

.v-table .v-data-table__wrapper {
  margin-bottom: 60px;
} */
</style>