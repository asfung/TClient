<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <video ref="videoPlayer" class="w-full rounded-lg" :src="src" @click="togglePlay" @timeupdate="updateProgress"
      @loadedmetadata="onLoadedMetadata"></video>

    <div
      class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between transition-opacity duration-300"
      :class="{ 'opacity-0 hover:opacity-100': !isPlaying && !isPaused }">
      <button @click.stop="togglePlay" class="text-white hover:text-gray-300 focus:outline-none p-2"
        aria-label="Play/Pause">
        <svg v-if="!isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3l12 7-12 7V3z" />
        </svg>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 4h4v12H6V4zm4 0h4v12h-4V4z" />
        </svg>
      </button>

      <div class="flex-1 mx-4">
        <input type="range" min="0" :max="duration" :value="currentTime" @input="seekVideo"
          class="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer" style="accent-color: white;" />
      </div>

      <button @click.stop="toggleMute" class="text-white hover:text-gray-300 focus:outline-none p-2"
        aria-label="Mute/Unmute">
        <svg v-if="isMuted" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 2v2.29c2.47.66 4.21 2.97 4.21 5.71s-1.74 5.05-4.21 5.71V18h3v2H7v-2h3v-2.29C7.53 15.05 5.79 12.74 5.79 10S7.53 4.95 10 4.29V2h-3V0h6v2h-3zm-5 8c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5z" />
          <path d="M2 2l16 16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 2v2.29c2.47.66 4.21 2.97 4.21 5.71s-1.74 5.05-4.21 5.71V18h3v2H7v-2h3v-2.29C7.53 15.05 5.79 12.74 5.79 10S7.53 4.95 10 4.29V2h-3V0h6v2h-3zm-5 8c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5z" />
        </svg>
      </button>

      <button @click.stop="toggleFullscreen" class="text-white hover:text-gray-300 focus:outline-none p-2"
        aria-label="Toggle Fullscreen">
        <svg v-if="!isFullscreen" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 3h5v2H5v3H3V3zm9 0h5v5h-2V5h-3V3zm-9 9h2v3h3v2H3v-5zm14 0h-2v2h-3v-2h-2v-5h5v5z" />
        </svg>
        <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3H0v5h2V5h3V3zm10 0h5v5h-2V5h-3V3zM0 12v5h5v-2H2v-3H0zm18 0h2v5h-5v-2h3v-3z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const videoPlayer = ref(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const isFullscreen = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const isPaused = ref(false)

const togglePlay = () => {
  if (videoPlayer.value.paused) {
    videoPlayer.value.play()
    isPlaying.value = true
    isPaused.value = false
  } else {
    videoPlayer.value.pause()
    isPlaying.value = false
    isPaused.value = true
  }
}

const toggleMute = () => {
  videoPlayer.value.muted = !videoPlayer.value.muted
  isMuted.value = videoPlayer.value.muted
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.value.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const updateProgress = () => {
  currentTime.value = videoPlayer.value.currentTime
}

const seekVideo = (event) => {
  const time = event.target.value
  videoPlayer.value.currentTime = time
  currentTime.value = time
}

const onLoadedMetadata = () => {
  duration.value = videoPlayer.value.duration
}

onMounted(() => {
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})
</script>

<style scoped>
/* Custom range input styling if needed */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}
</style>