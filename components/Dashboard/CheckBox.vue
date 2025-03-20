<template>
  <div class="" :class="wrapperClass">
    <input :id="id" type="checkbox" :checked="modelValue" :value="value" :disabled="disabled"
      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      :class="inputClass" @change="$emit('update:modelValue', $event.target.checked)">
    <label :for="id" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" :class="labelClass">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  wrapperClass: {
    type: String,
    default: 'mb-4'
  },
  inputClass: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>