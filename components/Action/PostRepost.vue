<template>
  <div class="flex items-center py-1">
    <button @click="toggleRepostFetch"
      class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-success hover:bg-opacity-10 hover:text-success transition-transform duration-200 ease-in-out active:scale-90">
      <svg class="h-7 w-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        :class="{'transition-transform duration-200 ease-out': isReposted, 'text-success': isReposted}"
        stroke="currentColor" viewBox="0 0 24 24">
        <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
      </svg>
      <div class="ml-1">
        <NumberCounter :count="props.count" />
      </div>
    </button>
  </div>
</template>

<script setup>
import { usePostStore } from '~/stores/Post'
import { useEditPostField } from '~/composables/useEditPostField'

const postStore = usePostStore()
const { editPostField } = useEditPostField()

const props = defineProps({
  reposted: Boolean,
  post_id: {
    required: true,
  },
  count: {
    required: true,
  },
})

const emit = defineEmits(['update-repost'])

const isReposted = ref(props.reposted);
const repostClass = computed(() => isReposted.value ? 'text-sucess fill-success' : '');

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const toggleRepostFetch = debounce( async () => {
  isReposted.value = !isReposted.value
  const fetch = await postStore.toggleRepost({
    post_id: props.post_id
  })
  isReposted.value = fetch.state
  const update_count = isReposted.value ? props.count + 1 : props.count - 1
  emit('update-repost', { post_id: props.post_id, reposted: isReposted.value, count: update_count});
}, 400);

</script>