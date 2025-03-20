<template>
  <div class="border-default rounded-lg">
    <PostItemParent :item="postReply" />
  </div>
</template>

<script setup>
definePageMeta({
  // middleware: ['auth-middleware'],
})
import { usePostStore } from '~/stores/Post'

const postStore = usePostStore()

const postReply = computed(() => postStore.postReply)
const allReplies = postStore.getAllReplies()

onMounted(() => {
  console.log(allReplies)
})

</script>