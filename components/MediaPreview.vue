<template>
  <div 
    v-if="modelValue" 
    @click.stop="(event) => handleBackgroundClick(event)"
    class="fixed inset-0 z-50 cursor-default flex items-center justify-center bg-gray-100 rounded-md backdrop-filter backdrop-blur-md bg-opacity-10">
    <button 
      @click="closePreview" 
      class="absolute top-4 right-4 dark:text-white hover:text-gray-300 transition-colors z-10"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <button 
      v-if="media.length > 1 && $isBreakpoint(['md', 'lg', 'xl'])" 
      @click="prevMedia" 
      class="absolute left-4 dark:text-white hover:text-gray-300 transition-colors z-10"
      :hidden="currentIndex === 0"
    >
      <!-- :disabled="currentIndex === 0" -->
      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      v-if="media.length > 1 && $isBreakpoint(['md', 'lg', 'xl'])" 
      @click="nextMedia" 
      class="absolute right-4 dark:text-white hover:text-gray-300 transition-colors z-10"
      :hidden="currentIndex === media.length - 1"
    >
      <!-- :disabled="currentIndex === media.length - 1" -->
      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>


    <!-- <div class="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"> -->
    <div ref="mediaContainer" class="relative max-w-[70vw] max-h-[70vh] flex items-center justify-center">
      <img 
        v-if="currentMedia.mimetypes.startsWith('image/')" 
        :src="$getImage(currentMedia.key)" 
        class="max-w-full max-h-[90vh] object-contain rounded-lg"
      />
      <video 
        v-else-if="currentMedia.mimetypes === 'video/mp4'" 
        :src="$getImage(currentMedia.key)" 
        class="max-w-full max-h-[90vh] object-contain rounded-lg"
        controls 
        autoplay
      />
    </div>

    <!-- hanya buat mobile adik adik, dunia memang absolut? -->
    <button 
      v-if="media.length > 1 && $isBreakpoint(['xs', 'sm'])" 
      @click="prevMedia" 
      class="absolute left-4 bottom-3 dark:text-white hover:text-gray-300 transition-colors z-10"
      :hidden="currentIndex === 0"
      >
      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button 
      v-if="media.length > 1 && $isBreakpoint(['xs', 'sm'])" 
      @click="nextMedia" 
      class="absolute right-4 bottom-3 dark:text-white hover:text-gray-300 transition-colors z-10"
      :hidden="currentIndex === media.length - 1"
      >
      <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div v-if="media.length > 1" class="absolute bottom-4 dark:text-white text-sm">
      {{ currentIndex + 1 }} / {{ media.length }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  media: {
    type: Array,
    default: () => []
  },
  startIndex: {
    type: Number,
    default: 0
  }
})
const mediaContainer = ref(null)

const emit = defineEmits(['update:modelValue'])

const currentIndex = ref(props.startIndex)
const currentMedia = computed(() => props.media[currentIndex.value] || {})
const scrollPosition = ref(0) 

watch(() => props.startIndex, (newIndex) => {
  currentIndex.value = newIndex
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    scrollPosition.value = window.scrollY
    document.body.classList.add('no-scroll')
    document.body.style.top = `-${scrollPosition.value}px`
  } else {
    document.body.classList.remove('no-scroll')
    window.scrollTo(0, scrollPosition.value)
  }
})

const handleBackgroundClick = (event) => {
  // event.stopPropagation()
  if (mediaContainer.value && !mediaContainer.value.contains(event.target)) {
    if (!event.target.closest('button')) {
      closePreview()
    }
  }
}

const closePreview = () => {
  emit('update:modelValue', false)
}

const prevMedia = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextMedia = () => {
  if (currentIndex.value < props.media.length - 1) {
    currentIndex.value++
  }
}

onMounted(() => {
  const handleEsc = (event) => {
    if (event.key === 'Escape' && props.modelValue) {
      closePreview()
    }
  }
  window.addEventListener('keydown', handleEsc)
  
  if (props.modelValue) {
    scrollPosition.value = window.scrollY
    document.body.classList.add('no-scroll')
    document.body.style.top = `-${scrollPosition.value}px`
  }

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEsc)
    document.body.classList.remove('no-scroll')
    document.body.style.top = '' 
    window.scrollTo(0, scrollPosition.value) 
  })
})
</script>

<style>
.no-scroll {
  position: fixed; 
  overflow: hidden;
  width: 100%; 
}
</style>