<template>
    <div class="border-default rounded-lg">
      <PostItemParent 
        :item="postReply" 
        :parent_id="parent_id"
      />
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    // middleware: ['auth-middleware'],
  })
  import { usePostStore } from '~/stores/Post'
  const route = useRoute()
  const parent_id = computed(() => route.params.id)
  
  const postStore = usePostStore()
  
  const postReply = computed(() => postStore.postReply)
  const allReplies = postStore.getAllReplies()
  
  onMounted(() => {
    // console.log(allReplies)
  })
  
  </script>