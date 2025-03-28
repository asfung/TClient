<template>
  <div class="">
    <div class="p-5">
      <v-timeline 
        align="start" 
        density="compact" 
        :line-color="$colorMode.preference === 'dark' ? 'grey-darken-3' : ''"
        line-inset="8" 
        truncate-line="both">
        <v-timeline-item>
          <template v-slot:icon>
            <v-avatar image="https://i.pravatar.cc/64"></v-avatar>
          </template>
          <PostItemReply :item="item" />
          <button 
            v-if="!showReplies && item.replies.length > 0"
            @click="toggleReplies" 
            class="text-primaryLight dark:text-primaryDark hover:underline focus:outline-none">
            <!-- {{ showReplies ? 'Hide Replies' : `Show Replies (${item.replies.length})` }} -->
              Show Replies
          </button>
        </v-timeline-item>

        <!-- <template v-if="showReplies" v-slot:default> -->
          <v-timeline-item v-if="showReplies" v-for="(reply, replyI) in item.replies" :key="replyI">
            <template v-slot:icon>
              <v-avatar image="https://i.pravatar.cc/64"></v-avatar>
            </template>
            <div>
              <PostItemReply :item="reply" />
            </div>
            <button 
              v-if="replyI === item.replies.length - 1"
              @click="handleLoadMoreReplies()" 
              class="text-blue-500 hover:underline focus:outline-none">
              <!-- {{ showReplies ? 'Hide Replies' : `Show Replies (${item.replies.length})` }} -->
                More Replies
            </button>
          </v-timeline-item>
        <!-- </template> -->
      </v-timeline>
      <!-- <hr> -->
    </div>
    <hr class="border-gray-600 dark:border-white" />
  </div>
</template>

<script setup>
import { usePostStore } from '~/stores/Post'

const props = defineProps({
  item: {
    required: true
  },
  index: {
    required: false
  }
})

const postStore = usePostStore()
const showReplies = ref(false)
const postsReply = computed(() => postStore.postsReply);


const clickedItemReply = (item) => {
  console.log('parent : ', item.id)
}

const toggleReplies = () => {
  showReplies.value = !showReplies.value
}

const handleLoadMoreReplies = () => {
  postStore.loadMoreReplies(props.item.id, 3)
}

</script>