<template>
  <div class="border-default rounded-lg">
    <PostItemParent 
      v-if="!isLoading"
      :item="postDetails" 
      :parent_id="parent_id"
      @update-replies="handleUpdateReplies"
    />
    <div v-else class="flex h-screen justify-center my-3">
      <v-progress-circular
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
  
  <script setup>
  definePageMeta({
    // middleware: ['auth-middleware'],
  })
  import { usePostStore } from '~/stores/Post'
  const route = useRoute()
  const parent_id = computed(() => route.params.id)
  const username = computed(() => route.params.name)
  
  const postStore = usePostStore()
  const isLoading = ref(false)
  
  const {
    postDetails
  } = storeToRefs(postStore)

  const postDetailsParentFetch = async () => {
    try{
      isLoading.value = true
      const fetch = await postStore.getPost({
        post_id: parent_id.value
      })
      // postStore.postDetails.parent = fetch.data
      postStore.postDetails = { parent: fetch.data || [], replies: postStore.postDetails.replies || [] };

      const parent_post = postStore.postDetails.parent.find(parentPost => parentPost.id === parent_id.value)
      if(parent_post && parent_post.user.username !== username.value){
        useNuxtApp().$router.push(`/@${parent_post.user.username}/talk/${parent_id.value}`)
      }
    }finally{
      isLoading.value = false
    }
  }

  const handleUpdateReplies = (replies) => {
    console.log(replies)
    if (!postDetails.value.replies) {
      postDetails.value.replies = []
      postDetails.value.replies.push(replies)
      return;
    }
    postDetails.value.replies.unshift(replies);
  }
  
  onMounted(() => {
    postDetailsParentFetch()
  })

  onUnmounted(() => {
    // reset the state pinia, cause im lazy
    postStore.postDetails = {}
    postStore.postsDetailsRepliesPage = 0
    postStore.postsDetailsRepliesHasNextPage = true
  })
  
  </script>

