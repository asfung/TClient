<template>
  <v-dialog
    v-model="internalValue"
    :max-width="maxWidth"
    scrollable
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6">{{ computedTitle }}</span>
        <v-btn
          icon
          variant="text"
          @click="closeModal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.key"
                  label="Permission Key"
                  placeholder="Enter unique permission key"
                  variant="outlined"
                  :rules="keyRules"
                  :readonly="isEditMode"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.name"
                  label="Permission Name"
                  placeholder="Enter permission name"
                  variant="outlined"
                  :rules="nameRules"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="formData.endpoint"
                  label="Endpoint"
                  placeholder="/api/endpoint"
                  variant="outlined"
                  :rules="endpointRules"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="isEditMode"
          color="error"
          variant="flat"
          @click="confirmDelete"
          prepend-icon="mdi-delete"
          :loading="isSubmitting"
        >
          Delete
        </v-btn>
        <v-btn
          color="primary"
          variant="flat"
          @click="handleSubmit"
          :prepend-icon="isEditMode ? 'mdi-pencil' : 'mdi-plus'"
          :loading="isSubmitting"
        >
          {{ submitText }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Delete Confirmation Dialog -->
    <v-dialog
      v-model="showDeleteConfirm"
      max-width="400"
    >
      <v-card>
        <v-card-title>Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete permission "{{ formData.name }}"?
          This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="showDeleteConfirm = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            @click="handleDelete"
            :loading="isSubmitting"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Create New Permission'
  },
  submitText: {
    type: String,
    default: 'Create Permission'
  },
  initialData: {
    type: Object,
    default: () => ({})
  },
  resourceId: {
    type: [String, Number],
    required: true
  },
  maxWidth: {
    type: [String, Number],
    default: 500
  },
  isEditMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'delete'])

const form = ref(null)
const isSubmitting = ref(false)
const showDeleteConfirm = ref(false)

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const computedTitle = computed(() => {
  return props.isEditMode ? 'Edit Permission' : props.title
})

const keyRules = [
  v => !!v || 'Key is required',
  v => /^[a-zA-Z0-9_-]+$/.test(v) || 'Key must be alphanumeric with hyphens or underscores'
]

const nameRules = [
  v => !!v || 'Name is required',
  v => v.length <= 50 || 'Name must be less than 50 characters'
]

const endpointRules = [
  v => !v || v.startsWith('/') || 'Endpoint must start with /',
  v => !v || /^\/[a-zA-Z0-9-_/]*$/.test(v) || 'Endpoint must be a valid URL path'
]

const formData = ref({
  key: '',
  name: '',
  endpoint: '',
  ...props.initialData
})

watch(() => props.initialData, (newData) => {
  formData.value = {
    key: '',
    name: '',
    endpoint: '',
    ...newData
  }
}, { deep: true })

const handleSubmit = async () => {
  const isValid = await form.value?.validate()
  if (!isValid) return

  isSubmitting.value = true
  try {
    emit('submit', {
      resourceId: props.resourceId,
      key: formData.value.key,
      name: formData.value.name,
      endpoint: formData.value.endpoint,
      isEdit: props.isEditMode
    })
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = () => {
  showDeleteConfirm.value = true
}

const handleDelete = async () => {
  isSubmitting.value = true
  try {
    emit('delete', {
      ...formData.value,
      resourceId: props.resourceId
    })
    showDeleteConfirm.value = false
    closeModal()
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  emit('update:modelValue', false)
  resetForm()
}

const resetForm = () => {
  formData.value = {
    key: '',
    name: '',
    endpoint: '',
    ...props.initialData
  }
  form.value?.resetValidation()
}

watch(internalValue, (newValue) => {
  if (!newValue) {
    resetForm()
    showDeleteConfirm.value = false
  }
})
</script>