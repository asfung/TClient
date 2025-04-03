<template>
  <div class="flex items-center">
    <button @click="toggleBookmarkFetch" :class="bookmarkClass"
      class="w-12 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-highlight hover:bg-opacity-10 hover:text-highlight transition-transform duration-200 ease-in-out active:scale-90">
      <svg :class="{'scale-110 transition-transform duration-200 ease-out': isBookmarked, 'text-highlight': isBookmarked}"
        class="h-7 w-7 transition-transform duration-200 ease-in-out" 
        :fill="isBookmarked ? 'var(--highlight-color)' : 'none'" 
        :stroke="isBookmarked ? 'var(--highlight-color)' : 'currentColor'" 
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        viewBox="0 0 24 24">
        <path d="M5 3v18l7-5 7 5V3z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePostStore } from '~/stores/Post';

const postStore = usePostStore()

const props = defineProps({
  bookmarked: Boolean,
  post_id: {
    required: true,
  },
});

const emit = defineEmits(['update-bookmark'])

const isBookmarked = ref(props.bookmarked);
const bookmarkClass = computed(() => isBookmarked.value ? 'text-highlight fill-highlight' : '');

const toggleBookmarkFetch = async () => {
  isBookmarked.value = !isBookmarked.value
  const fetch = await postStore.toggleBookmark({
    post_id: props.post_id
  })
  isBookmarked.value = fetch.state
  emit('update-bookmark', { post_id: props.post_id, bookmarked: isBookmarked.value });
};
</script>
