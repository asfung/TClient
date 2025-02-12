<template>
  <div class="flex flex-shrink-0 p-8 pb-0">
    <ol class="relative border-timeline" :class="{ 'border-none': (item.length + item.replies.length) === index + 1 }">
      <li class="ms-8 -mt-6">
        <!-- <p>{{ index }}</p> -->
        <PostItemReply :item="item" />
      </li>
      <li class="ms-8 -mt-6" v-for="(reply, replyI) in item.replies" :key="replyI">
        <p @click="clickedItemReply(item)">{{ replyI }}</p>
        <PostItemReply :item="reply" />
      </li>
      <!-- <p>end</p> -->
      <hr class="border-gray-600 dark:border-white w-full" />
    </ol>
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