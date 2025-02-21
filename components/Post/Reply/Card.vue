<template>
  <!-- <div class="flex flex-shrink-0 p-8 pb-0">
    <ol class="relative border-timeline" :class="{ 'border-none': item.replies.length === 0 }">
      <li class="ms-8 -mt-6">
        <PostItemReply :item="item" />
      </li>
      <li class="ms-8 -mt-6" v-for="(reply, replyI) in item.replies" :key="replyI">
        <PostItemReply :item="reply" />
      </li>
      <hr class="border-gray-600 dark:border-white w-full" />
    </ol>
  </div> -->

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
        </v-timeline-item>
        <v-timeline-item v-for="(reply, replyI) in item.replies" :key="replyI">
          <template v-slot:icon>
            <v-avatar image="https://i.pravatar.cc/64"></v-avatar>
          </template>
          <div>
            <PostItemReply :item="reply" />
          </div>
        </v-timeline-item>
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

const postsReply = computed(() => postStore.postsReply);

const clickedItemReply = (item) => {
  console.log('parent : ', item.id)
}

</script>