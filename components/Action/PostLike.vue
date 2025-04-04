<template>
  <div class="flex items-center py-1">
    <button @click="toggleLikeFetch" :class="likeClass"
      class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-accent hover:bg-opacity-10 hover:text-accent transition-transform duration-200 ease-in-out active:scale-75">
      <svg :class="{'scale-110 transition-transform duration-200 ease-out': isLiked, 'text-accent': isLiked}"
        width="100" height="100"
        class="h-7 w-7 transition-transform duration-200 ease-in-out" 
        :fill="isLiked ? 'var(--accent-color)' : 'none'" 
        :stroke="isLiked ? 'var(--accent-color)' : 'currentColor'" 
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        viewBox="0 0 24 24">
        <path
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
        </path>
      </svg>
      <div class="ml-1">
         <NumberCounter :count="props.count" />
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePostStore } from '~/stores/Post'

const postStore = usePostStore()

const props = defineProps({
  liked: Boolean,
  post_id: {
    required: true,
  },
  count: {
    required: true,
  },
});

const emit = defineEmits(['update-like'])

const isLiked = ref(props.liked);
const likeClass = computed(() => isLiked.value ? 'text-accent fill-accent' : '');

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const toggleLikeFetch = debounce( async () => {
  isLiked.value = !isLiked.value
  const update_fast = isLiked.value ? props.count + 1 : props.count - 1
  emit('update-like', { post_id: props.post_id, liked: isLiked.value, count: update_fast});
  const fetch = await postStore.toggleLike({
    post_id: props.post_id
  })
  isLiked.value = fetch.state
  // const update_count = isLiked.value ? props.count + 1 : props.count - 1
  const update_count = props.count
  emit('update-like', { post_id: props.post_id, liked: isLiked.value, count: update_count});
}, 400);

</script>
