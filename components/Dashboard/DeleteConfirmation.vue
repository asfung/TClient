<template>
  <v-dialog v-model="internalDialog" max-width="400">
    <v-card>
      <v-card-title>Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete "{{ name }}"?
        This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="internalDialog = false">
          Cancel
        </v-btn>
        <v-btn color="error" variant="flat" @click="$emit('confirm')" :loading="loading">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const internalDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>