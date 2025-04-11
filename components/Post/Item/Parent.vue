<!-- https://github.com/vuetifyjs/vuetify/issues/17288 -->
 <!-- 100% is fine for now -->
<template>
  <div class="">
    <div :class="headerClass">
      <ArrowLeftIcon @click="$router.back()" class="size-5 cursor-pointer hover:bg-gray-600 hover:rounded-lg" />
      <p>Post</p>
    </div>
    <div class="flex flex-shrink-0 pt-4 pb-2 justify-between">
      <v-timeline 
          dot-color="grey-darken-2"
          fill-dot
          align="start" 
          density="comfortable" 
          :line-color="$colorMode.preference === 'dark' ? 'grey-darken-3' : ''"
          line-inset="8" 
          truncate-line="both"
          >
          <v-timeline-item 
            width="100%"
            v-for="(item, index) in reversedParent" 
            :ref="el => setTimelineRef(el, index)"
            @click="(event) => clickPostItem(item,index, event)" 
            @mousedown="startSelection"
            @mouseup="endSelection"
            :class="index === lastIndex ? 'cursor-default' : 'cursor-pointer'"
            class=" hover:bg-gray-400 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
            :key="index">
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
            <PostItemReply 
              class="mr-4"
              v-if="item"
              :hide-click="index === lastIndex"
              :item="item" 
            />
          </v-timeline-item>

      </v-timeline>
    </div>

    <div v-if="props.item?.parent?.length > 0" class="flex items-center justify-between p-4 border-y">
      <div class="w-full">
        <PostInput 
          :uniqueId="'post-input-reply'"
          :parent_id="props.parent_id"
          @update:fileUploadPrepared="handleFileUploaded"
          @post-created="handlePostCreated" 
        />
      </div>
    </div>

    <div class="replies">
      <div v-if="!isLoadingReply">
        <div v-if="item.replies && item.replies.length > 0">
          <div v-for="(reply, index) in item.replies" :key="index">
            <PostReplyCard :item="reply" :index="index" :lastIndex="props.item.replies.length - 1" />
          </div>
        </div>
        <div v-else class="text-center p-4">
          No Replies
        </div>
      </div>
      <div v-else class="flex h-screen justify-center my-3">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>

      <div id="checkpoint-section"></div>
    </div>
    
    <DialogTextArea :dialog="replyDialog" @close-dialog="closeReplyDialog" :parent_id="props.parent_id" />
  </div>
</template>


<script setup>
import { PostReplyCard } from '#components'
import { ArrowLeftIcon, CurrencyEuroIcon } from '@heroicons/vue/24/outline'
import { usePostStore } from '~/stores/Post'

const postStore = usePostStore()
const scrollY = ref(0)
const replyDialog = ref(false)
const timelineRefs = ref([])
const uploadedFiles = ref([]);
const isSelectingText = ref(false)
const lastIndex = computed(() => reversedParent.value.length - 1);

const isLoadingReply = ref(false)
const postsDetailsRepliesPage = computed(() => postStore.postsDetailsRepliesPage)
const postsDetailsRepliesHasNextPage = computed(() => postStore.postsDetailsRepliesHasNextPage)

const props = defineProps({
  item: {
    required: true
  },
  parent_id: {
    required: true
  }
})
// WARN: load-more unused, 
const emit = defineEmits(['load-more', 'update-replies']);

// credit: https://www.youtube.com/watch?v=AQt5HDOH-HY
// not use this again 
const replies = computed({
  get(){
    return props.item.replies
  },
  set(value){
    console.log(value)
    emit('update-replies', value)
  }
})

const reversedParent = computed(() => {
  if (!props.item?.parent || !Array.isArray(props.item.parent)) {
    return [];
  }
  return [...props.item.parent].reverse(); 
});

const setTimelineRef = (el, index) => {
  if (el?.$el) {
    timelineRefs.value[index] = el.$el; 
  }
}

const headerClass = computed(() => {
  // console.log(scroll)
  // fkin small pixel smh
  return scrollY.value > 0
    ? 'flex sticky top-0 z-10 bg-[#ffff] dark:bg-black p-5 space-between items-center space-x-2'
    : 'flex sticky top-0 z-10 bg-[#ffff] dark:bg-black p-5 rounded-t-lg space-between items-center space-x-2';
});

const closeReplyDialog = () => {
  replyDialog.value = false
}

const handleTimeLineBody = () => {
  const lastIndex = reversedParent.value.length - 1;
  const timelineItem = timelineRefs.value[lastIndex];

  if (timelineItem) {
    const bodyElement = timelineItem.querySelector('.v-timeline-item__body');
    if (bodyElement) {
      const offset = 68; // 64 (the profile_image lil bit cut), 68 (its great for now)
      const elementPosition = bodyElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset });
    } else {
      console.warn('class .v-timeline-item__body not found:', timelineItem);
    }
  } else {
    console.warn('last timeline item index not found');
  }
}

const adjustRepliesHeight = () => {
  const repliesSection = document.querySelector('.replies');
  const timeline = document.querySelector('.v-timeline');
  if (repliesSection && timeline && (!props.item.replies || props.item.replies.length === 0)) {
    const timelineHeight = timeline.offsetHeight + 20; // setting some offset top when has no replies
    // make sure the replies section matches timeline height
    repliesSection.style.minHeight = `${timelineHeight}px`; 
  }
};

const handleFileUploaded = (files) => {
  uploadedFiles.value = files; 
  console.log('Files uploaded in Post/index.vue:', files);
};

const handlePostCreated = (newPost) => {
  console.log('Post created in Post/index.vue:', newPost);
  emit('update-replies', newPost)
  const post = postStore.posts.find((post) => post.id === newPost.id);
  // sementara, later using websocket
  // if (post) {
  //   post.count = newCount;  
  //   post.liked = newLikedStatus;  
  // }
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY;
  });

  nextTick(() => {
    setTimeout(() => {
      // trigger handleTimeLineBody only if both reversedParent and replies have data
      if (reversedParent.value.length > 0 && props.item.replies?.length > 0) {
        handleTimeLineBody();
      } else if (reversedParent.value.length > 0) {
        // if only reversedParent has data, adjust height and then scroll
        adjustRepliesHeight();
        handleTimeLineBody();
      }
      observeSentinel();
    }, 100);
  });
})

onUnmounted(() => {
  // postStore.postDetails = {}
  postStore.postDetails = { parent: [], replies: [] }; 
  postStore.postsDetailsRepliesPage = 0;
  postStore.postsDetailsRepliesHasNextPage = true;
})

const clickPostItem = (item, index, event) => {
  if (!isSelectingText.value && index !== lastIndex.value) {
    if (event.target.closest('.v-timeline-divider')) {
      return;
    }
    useNuxtApp().$router.push(`/@${item.user.username}/talk/${item.id}`)
  }
}

const startSelection = () => {
  isSelectingText.value = false;
};

const endSelection = () => {
  const selection = window.getSelection().toString()
  if (selection.length > 0) {
    isSelectingText.value = true;
  }
};

const postDetailsReplyFetch = async (page = 1) => {
  try {
    // prevent looping fetching  calls
    if (!postsDetailsRepliesHasNextPage.value) return; 
    isLoadingReply.value = true;

    const fetch = await postStore.getReplies({
      post_id: props.parent_id,
      page: page,
    });

    if (page === 1) {
    // reset replies on new fetch at first page
      postStore.postDetails.replies = fetch.data; 
    } else {
      // append only new replies data
      postStore.postDetails.replies.push(...fetch.data); 
    }

    postStore.postsDetailsRepliesPage = page;
    postStore.postsDetailsRepliesHasNextPage = fetch.hasNextPage;
  } finally {
    isLoadingReply.value = false;
  }
};


const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postsDetailsRepliesHasNextPage.value  && !isLoadingReply.value) {
        const nextPage = postsDetailsRepliesPage.value + 1;
        postDetailsReplyFetch(nextPage)
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
};


</script>


<style scope>
.v-timeline-divider {
  cursor: default;
}
/* default minimum div.replies height */
/* .replies {
  min-height: 100px; 
} */
</style>
