<template>
  <div
    v-if="visible"
    :style="{ top: y + 'px', left: x + 'px' }"
    class="absolute bg-primaryLight dark:bg-primaryDark shadow-lg rounded p-2 z-50"
    @click.stop
  >
    <ul class="text-sm">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        class="p-3 dark:hover:bg-gray-500 hover:bg-white cursor-pointer"
        @click="handleItemClick(item.action)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  menuItems: {
    type: Array,
    default: () => [
      { label: 'Edit', action: 'edit' },
      { label: 'Delete', action: 'delete' },
      { label: 'Duplicate', action: 'duplicate' }
    ]
  }
})

const emit = defineEmits(['action', 'close'])

const handleItemClick = (action) => {
  emit('action', action)
  emit('close')
}

const hideMenu = () => {
  emit('close')
}

onMounted(() => {
  document.addEventListener('click', hideMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', hideMenu)
})
</script>