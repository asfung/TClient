<template>
  <div class="relative inline-block mr-2" :class="[sizeClasses, customClass]">
    <input
      :id="id"
      type="checkbox"
      v-model="internalValue"
      class="peer appearance-none bg-slate-200 dark:bg-slate-600 rounded-full checked:bg-primaryLight dark:checked:bg-primaryDark cursor-pointer transition-colors duration-300"
      :class="inputClasses"
      :disabled="disabled"
      @change="handleChange"
    />
    <label
      :for="id"
      class="absolute top-0 left-0 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:border-slate-800 cursor-pointer"
      :class="[
        labelClasses,
        { 'peer-checked:translate-x-6': size === 'md' },
        { 'peer-checked:translate-x-4': size === 'sm' },
        { 'peer-checked:translate-x-8': size === 'lg' },
        { 'cursor-not-allowed opacity-50': disabled }
      ]"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => `switch-${Math.random().toString(36).substr(2, 9)}`
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'click'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const sizeClasses = computed(() => {
  return {
    'w-9 h-4': props.size === 'sm',
    'w-11 h-5': props.size === 'md',
    'w-14 h-6': props.size === 'lg'
  }
})

const inputClasses = computed(() => {
  return {
    'w-9 h-4': props.size === 'sm',
    'w-11 h-5': props.size === 'md',
    'w-14 h-6': props.size === 'lg'
  }
})

const labelClasses = computed(() => {
  return {
    'w-4 h-4': props.size === 'sm',
    'w-5 h-5': props.size === 'md',
    'w-6 h-6': props.size === 'lg'
  }
})

const handleChange = (event) => {
  const newValue = event.target.checked
  emit('update:modelValue', newValue)
  emit('click', newValue)
}
</script>