<template>
  <span :class="[
    modelValue ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
    'text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl',
    'dark:bg-opacity-90 dark:text-opacity-90',
    modelValue ? 'dark:bg-green-900 dark:text-green-300' : 'dark:bg-red-900 dark:text-red-300'
  ]">
    <slot>{{ modelValue ? label[0] : label[1] }}</slot>
  </span>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: Object,
    default: [
      'Enabled',
      'Disabled'
    ]
  },

})
</script>