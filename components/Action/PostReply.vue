<template>
  <div class="flex items-center py-1">
  <button
    @click.stop="replyDialog = !replyDialog"
    class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-primaryLight hover:bg-opacity-10 hover:text-primaryLight transition-transform duration-200 ease-in-out active:scale-90">
    <svg class="h-7 w-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      stroke="currentColor" viewBox="0 0 24 24">
      <path
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
      </path>
    </svg>
    <div class="ml-1">
      <NumberCounter :count="props.count" />
    </div>
  </button>
  <DialogTextArea :dialog="replyDialog" @close-dialog="closeReplyDialog" :parent_id="props.parent_id" @post-created="handlePostCreated" />
  </div>
</template>

<script setup>
const replyDialog = ref(false)
const props = defineProps({
  count: {
    required: true,
  },
  parent_id: {
    required: true
  }
})

const closeReplyDialog = () => {
  replyDialog.value = false
}

const handlePostCreated = (newPost) => {
  console.log(newPost)
}

</script>