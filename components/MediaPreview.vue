<template>
  <v-dialog v-model="show" width="auto">
    <div
      class="relative bg-white dark:bg-black shadow-lg p-2 mx-auto w-full sm:rounded-lg"
    >
      <button
        class="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white z-10"
        @click="closeDialog"
      >
        ✕
      </button>

      <UCarousel
        ref="carouselRef"
        v-slot="{ item }"
        :items="media"
        :ui="{ item: 'flex justify-center', container: 'scroll-smooth items-center' }"
      >
        <img
          v-if="item.mimetypes.startsWith('image/')"
          :src="$getImage(item.key)"
          class="rounded-lg max-h-[70vh] max-w-full object-contain"
        />
        <video
          v-else-if="item.mimetypes === 'video/mp4'"
          :src="$getImage(item.key)"
          class="rounded-lg max-h-[70vh] max-w-full object-contain"
          controls
        />
      </UCarousel>
    </div>
  </v-dialog>
</template>


<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  media: Array,
  startIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update:modelValue'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const carouselRef = ref()

const closeDialog = () => {
  show.value = false
}

watch(show, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(() => {
      carouselRef.value?.select(props.startIndex + 1)
      // carouselRef.value?.select(props.startIndex)
    }, 50)
  }
})
</script>
