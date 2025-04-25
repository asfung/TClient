<template>
  <div class="flex items-center py-1 relative" ref="dropdownRef">
    <div class="relative">
      <button @click="toggleDropdown"
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

      <div v-if="showDropdown"
        class="absolute right-0 top-10 z-10 w-32 shadow-lg bg-gray-100 dark:bg-black rounded-2xl ring-1 ring-primaryDark dark:ring-primaryLight shadow-primaryLight/50 dark:shadow-primaryDark/50">
        <button @click="handleRepost" class="block rounded-t-2xl w-full text-left px-4 py-2 hover:bg-gray-300 dark:hover:bg-opacity-10">{{ props.reposted ? 'Unrepost' : 'Repost' }}</button>
        <button @click="handleQuote" class="block rounded-b-2xl w-full text-left px-4 py-2 hover:bg-gray-300 dark:hover:bg-opacity-10">Quote</button>
      </div>
    </div>

    <DialogTextArea 
      :dialog="showQuoteDialog" 
      :type-for="'quote'" 
      :parent_id="props.post_id"  
      @close-dialog="closeReplyDialog"
      @post-created="handlePostCreated"
    />
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePostStore } from '~/stores/Post'

const postStore = usePostStore()

const props = defineProps({
  reposted: Boolean,
  post_id: { required: true },
  count: { required: true },
  item: { type: Object, required: false },
})

const emit = defineEmits(['update-repost', 'post-updated'])

const isReposted = ref(props.reposted)
const showDropdown = ref(false)
const showQuoteDialog = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// REPOST handler
const handleRepost = async () => {
  showDropdown.value = false
  isReposted.value = !isReposted.value
  const fetch = await postStore.toggleRepost({ post_id: props.post_id })
  isReposted.value = fetch.state
  const update_count = isReposted.value ? props.count + 1 : props.count - 1
  emit('update-repost', {
    post_id: props.post_id,
    reposted: isReposted.value,
    count: update_count,
  })
}

// QUOTE handler
const handleQuote = () => {
  showDropdown.value = false
  showQuoteDialog.value = true  
}

const handlePostCreated = (newPostQuote) => {
  postStore.posts.unshift(newPostQuote)
}

const closeReplyDialog = () => {
  showQuoteDialog.value = false
  showDropdown.value = true
}

</script>
