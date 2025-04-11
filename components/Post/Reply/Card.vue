<template>
  <div>
    <div class="p-5">
      <v-timeline 
        align="start" 
        density="compact" 
        dot-color="grey-darken-2"
        fill-dot
        line-inset="8" 
        truncate-line="both">

        <v-timeline-item
          width="100%"
          @click="(event) => clickPostItem(item, event)" 
          @mousedown="startSelection"
          @mouseup="endSelection"
          class="cursor-pointer hover:bg-gray-400 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
          >
          <template v-slot:icon>
            <TooltipCard v-if="item.user">
                <template v-slot:body>
                  <img v-bind="props" class="h-10 w-10 rounded-full" @click.stop="$redirectProfile(item.user)"
                    :src="item.user.profile_image ? $getImage(item.user.profile_image.key) : $randomProfileImage(item.user.display_name)" alt="" />
                </template>
                <template v-slot:tooltip>
                  <div class="mt-2">
                    <TooltipUser :user="item.user" />
                  </div>
                </template>
              </TooltipCard>
          </template>
          <PostItemReply :item="item" :show-quote="false" />
          <button 
            v-if="item.reply_count > 0 && !showReplies"
            @click.stop="fetchReplies" 
            class="text-primaryLight dark:text-primaryDark hover:underline focus:outline-none">
            Show Replies
          </button>
          <pre>{{ item.replis }}</pre>
        </v-timeline-item>
        
        <!-- BUG BIG BROO, CLICK REPLY CLICK POST STILL REDIRECT TO item not item.replies -->
        <!-- NOW IT SOLVED -->
        <v-timeline-item 
          width="100%"
          v-if="showReplies" v-for="(reply, replyI) in item.replies" 
          class="cursor-pointer hover:bg-gray-400 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
          @click="(event) => clickPostItem(reply, event)" 
          @mousedown="startSelection"
          @mouseup="endSelection"
          :key="replyI">
          <template v-slot:icon>
            <TooltipCard >
                <template v-slot:body>
                  <img v-bind="props" class="h-10 w-10 rounded-full" @click.stop="$redirectProfile(reply?.user)"
                    :src="reply.user.profile_image ? $getImage(reply.user.profile_image.key) : $randomProfileImage(reply.user.display_name)" alt="" />
                </template>
                <template v-slot:tooltip>
                  <div class="mt-2">
                    <TooltipUser :user="reply.user" />
                  </div>
                </template>
              </TooltipCard>
          </template>
          <div>
            <PostItemReply :item="reply" :show-quote="false" />
          </div>
          <button 
            v-if="replyI === item.replies.length - 1 && replyRepliesHasNextPage"
            @click.stop="handleLoadMoreReplies" 
            class="text-blue-500 hover:underline focus:outline-none">
            More Replies
          </button>
        </v-timeline-item>
      </v-timeline>

    </div>
    <hr v-if="props.lastIndex !== props.index" class="border-gray-600 dark:border-white" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePostStore } from '~/stores/Post';

const props = defineProps({
  item: {
    required: true
  },
  index: {
    required: false
  },
  lastIndex: {
    required: false
  },
});

const postStore = usePostStore();
const showReplies = ref(false);
const isSelectingText = ref(false)

const replyRepliesPerPage = ref(1)
const replyRepliesPage = ref(1)
const replyRepliesHasNextPage = ref(true)

const fetchReplies = async () => {
  if (!showReplies.value) {
    const response = await postStore.getReplies({
      post_id: props.item.id,
      page: replyRepliesPage.value,
      per_page: replyRepliesPerPage.value,
      sort: 'asc'
    });
    if (response.status === 200) {
      props.item.replies = response.data;
      replyRepliesHasNextPage.value = response.hasNextPage;
      replyRepliesPage.value += 1
      showReplies.value = true;
    }
  } else {
    showReplies.value = false;
  }
};

const handleLoadMoreReplies = async () => {
  const response = await postStore.getReplies({ 
    post_id: props.item.id, 
    page: replyRepliesPage.value,
    per_page: replyRepliesPerPage.value,
    sort: 'asc'
  });
  if (response.status === 200) {
    props.item.replies.push(...response.data);
    replyRepliesHasNextPage.value = response.hasNextPage;
    replyRepliesPage.value += 1
  }
  console.log(replyRepliesHasNextPage.value)
};

const clickPostItem = (item, event) => {
  if (!isSelectingText.value ) {
    if (event.target.closest('.v-timeline-divider')) {
      return;
    }
    useNuxtApp().$router.push(`/@${item.user.username}/talk/${item.id}`);
  }
}

const startSelection = () => {
  isSelectingText.value = false;
};

const endSelection = () => {
  const selection = window.getSelection().toString();
  if (selection.length > 0) {
    isSelectingText.value = true;
  }
};

</script>

<style scope>
.v-timeline-divider {
  cursor: default;
}
</style>