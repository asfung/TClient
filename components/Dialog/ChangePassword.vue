<template>
  <v-dialog v-model="isDialogOpen" width="600">
    <div
      class="relative border rounded-lg bg-gray-200 text-gray-900 dark:bg-neutral-dark dark:text-white border-gray-300 dark:border-neutral-700 shadow-md py-4 px-6"
    >
      <button
        class="absolute top-2 right-2 bg-gray-200 dark:bg-neutral-dark rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
        @click="closeDialog"
        aria-label="Close dialog"
      >
        &times;
      </button>

      <div class="mt-4 space-y-4">
        <h3 class="text-lg font-bold mb-2">Change Password</h3>

        <div class="relative">
          <label class="text-sm font-semibold block mb-1">Current Password</label>
          <input
            v-model="form.current_password"
            :type="isPasswordCurrentVisible ? 'text' : 'password'"
            class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium pr-10 bg-gray-200 dark:bg-neutral-dark text-gray-900 dark:text-white"
            placeholder="Current password"
          />
          <button
            type="button"
            @click="isPasswordCurrentVisible = !isPasswordCurrentVisible"
            class="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
          >
            <svg v-if="!isPasswordCurrentVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.875 18.825a10.05 10.05 0 01-3.875.675C5.758 19.5 2 14 2 14s1.758-3.89 4.95-5.925a10.05 10.05 0 013.875-.675m7.1 3.4c.472.584.872 1.2 1.2 1.775M3 3l18 18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9c-7.732 0-14 9-14 9s6.268 9 14 9 14-9 14-9-6.268-9-14-9z" />
            </svg>
          </button>
        </div>

        <div class="relative">
          <label class="text-sm font-semibold block mb-1">New Password</label>
          <input
            v-model="form.new_password"
            :type="isPasswordNewVisible ? 'text' : 'password'"
            class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium pr-10 bg-gray-200 dark:bg-neutral-dark text-gray-900 dark:text-white"
            placeholder="New password"
          />
          <button
            type="button"
            @click="isPasswordNewVisible = !isPasswordNewVisible"
            class="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
          >
            <svg v-if="!isPasswordNewVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.875 18.825a10.05 10.05 0 01-3.875.675C5.758 19.5 2 14 2 14s1.758-3.89 4.95-5.925a10.05 10.05 0 013.875-.675m7.1 3.4c.472.584.872 1.2 1.2 1.775M3 3l18 18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9c-7.732 0-14 9-14 9s6.268 9 14 9 14-9 14-9-6.268-9-14-9z" />
            </svg>
          </button>
        </div>

        <div class="relative">
          <label class="text-sm font-semibold block mb-1">Confirm New Password</label>
          <input
            v-model="form.confirm_password"
            :type="isPasswordConfirmVisible ? 'text' : 'password'"
            class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium pr-10 bg-gray-200 dark:bg-neutral-dark text-gray-900 dark:text-white"
            placeholder="Confirm password"
          />
          <button
            type="button"
            @click="isPasswordConfirmVisible = !isPasswordConfirmVisible"
            class="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
          >
            <svg v-if="!isPasswordConfirmVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.875 18.825a10.05 10.05 0 01-3.875.675C5.758 19.5 2 14 2 14s1.758-3.89 4.95-5.925a10.05 10.05 0 013.875-.675m7.1 3.4c.472.584.872 1.2 1.2 1.775M3 3l18 18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9c-7.732 0-14 9-14 9s6.268 9 14 9 14-9 14-9-6.268-9-14-9z" />
            </svg>
          </button>
          <p v-if="passwordMismatch" class="text-sm text-red-500 mt-1">Passwords do not match</p>
        </div>

        <div class="flex justify-end mt-4">
          <button
            :disabled="isDisabled"
            @click="savePassword"
            class="bg-primaryLight dark:bg-primaryDark text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
            >
            Save
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  dialog: Boolean,
})
const emit = defineEmits(['update:dialog', 'password-changed', 'close-dialog'])

const isDialogOpen = ref(props.dialog)
watch(() => props.dialog, (val) => (isDialogOpen.value = val))
watch(isDialogOpen, (val) => {
  emit('update:dialog', val)
  if (!val) emit('close-dialog')
})

const form = reactive({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const isPasswordCurrentVisible = ref(false)
const isPasswordNewVisible = ref(false)
const isPasswordConfirmVisible = ref(false)

const passwordMismatch = computed(() => {
  return form.new_password && form.confirm_password && form.new_password !== form.confirm_password
})

const isDisabled = computed(() => {
  return (
    !form.current_password ||
    !form.new_password ||
    !form.confirm_password ||
    passwordMismatch.value
  )
})

const resetForm = () => {
  form.current_password = ''
  form.new_password = ''
  form.confirm_password = ''
  isPasswordCurrentVisible.value = false
  isPasswordNewVisible.value = false
  isPasswordConfirmVisible.value = false
}

const closeDialog = () => {
  isDialogOpen.value = false
  resetForm()
}

const savePassword = () => {
  const payload = {
    current_password: form.current_password,
    new_password: form.new_password,
  }
  emit('password-changed', payload)
  // closeDialog()
}
</script>

<style scoped>
.border-input {
  border: 1px solid rgb(71 85 105);
}
</style>
