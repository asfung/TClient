<template>
  <div class="border-default rounded-lg">
    <PostItemParent 
      v-if="!isLoading"
      :item="postDetails" 
      :parent_id="parent_id"
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
  
  const postStore = usePostStore()
  const isLoading = ref(false)
  
  // const postReply = computed(() => postStore.postReply)
  const postDetails = computed(() => postStore.postDetails)
  // const allReplies = postStore.getAllReplies()

  const postDetailsParentFetch = async () => {
    try{
      isLoading.value = true
      const fetch = await postStore.getPost({
        post_id: parent_id.value
      })
      // postStore.postReply.parent = fetch.data
      postStore.postDetails.parent = fetch.data
    }finally{
      isLoading.value = false
    }
  }
  
  const postDetailsReplyFetch = async () => {
    const fetch = await postStore.getReplies({
      post_id: parent_id.value
    })
    // postStore.postReply.replies = fetch.data
    postStore.postDetails.replies = fetch.data
  }

  onMounted(() => {
    postDetailsParentFetch()
    postDetailsReplyFetch()
  })
  
  </script>



<!-- <template>
  <div class="border-default rounded-lg">
    <PostItemParent 
      v-if="postReply" 
      :item="postReply" 
      :parent_id="parent_id" 
    />
  </div>
</template>

<script setup>
import { usePostStore } from '~/stores/Post'

const route = useRoute()
const parent_id = computed(() => route.params.id)
const postStore = usePostStore()

const { data: postReply } = await useAsyncData(
  `post-${parent_id.value}`,
  async () => {
    const fetchParent = await postStore.getPost({ post_id: parent_id.value })
    console.log(fetchParent)
    postStore.postReply.parent = fetchParent.data
    return postStore.postReply
  }
)
</script> -->
