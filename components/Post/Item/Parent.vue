<template>
  <div class="">
    <!-- edge of header must be top-11 -->
    <!-- <div class="flex sticky top-0  z-10 bg-[#ffff] dark:bg-black p-5 rounded-t-lg space-between items-center space-x-2"> -->
    <div :class="headerClass">
      <ArrowLeftIcon class="size-5 hover:bg-gray-600 hover:rounded-lg" />
      <p>Post</p>
    </div>
    <div class="flex flex-shrink-0 p-4 pb-2 justify-between">
      <!-- {{ item.parent[0] }} -->
      <v-timeline 
          align="start" 
          density="compact" 
          :line-color="$colorMode.preference === 'dark' ? 'grey-darken-3' : ''"
          line-inset="8" 
          truncate-line="both"
          >
          <v-timeline-item 
            v-for="(item, index) in reversedParent" 
            :ref="el => setTimelineRef(el, index)"
            :key="index">
            <p>{{ `timeLineItem-${index}` }}</p>
            <template v-slot:icon>
              <v-avatar image="https://i.pravatar.cc/64"></v-avatar>
            </template>
            <PostItemReply :item="item" />
          </v-timeline-item>

      </v-timeline>
    </div>

    <div class="flex items-center justify-between p-4 border-y">
      <!-- <div @click="replyDialog = true" class="hover:bg-gray-600 w-full hover:rounded-full hover:bg-opacity-20 cursor-pointer duration-400">
        <div class="dark:text-gray-500 ">
          <img class="inline-block h-10 w-10 rounded-full"
            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
          Reply
        </div>
      </div> -->
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
      <div v-for="(item, index) in item.replies" :key="index">
        <PostReplyCard :item="item" :index="index" />
      </div>
    </div>

    <DialogTextArea :dialog="replyDialog" @close-dialog="closeReplyDialog" :parent_id="props.parent_id" />

  </div>
</template>


<script setup>
import { PostReplyCard } from '#components'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { usePostStore } from '~/stores/Post'

const isBookmarked = ref(false)
const isLiked = ref(false)
const postStore = usePostStore()
const scrollY = ref(0)
const replyDialog = ref(false)
const postsReply = computed(() => postStore.postsReply);
const timelineRefs = ref([])
const uploadedFiles = ref([]);

const props = defineProps({
  item: {
    required: true
  },
  parent_id: {
    required: true
  }
})

const reversedParent = computed(() => {
  return [...props.item.parent].reverse(); 
});

const setTimelineRef = (el, index) => {
  // if (el) {
  //   timelineRefs.value[index] = el
  // }
  if (el?.$el) {
    timelineRefs.value[index] = el.$el; 
  }
}

const bookmarkClass = computed(() => {
  return isBookmarked.value ? 'text-center h-7 w-6 fill-current text-highlight' : 'text-center h-7 w-6';
});

const likeClass = computed(() => {
  return isLiked.value ? 'text-center h-7 w-6 fill-current text-accent' : 'text-center h-7 w-6';
});

const headerClass = computed(() => {
  // console.log(scroll)
  // fkin small pixel smh
  return scrollY.value > 0
    ? 'flex sticky top-0 z-10 bg-[#ffff] dark:bg-black p-5 space-between items-center space-x-2'
    : 'flex sticky top-0 z-10 bg-[#ffff] dark:bg-black p-5 rounded-t-lg space-between items-center space-x-2';
});

const toggleBookmark = () => {
  console.log('before ', isBookmarked.value)
  isBookmarked.value = !isBookmarked.value
  console.log('after ', isBookmarked.value)
}

const toggleLike = () => {
  console.log('before ', isLiked.value)
  isLiked.value = !isLiked.value
  console.log('after ', isLiked.value)
}

const clickPostItem = () => {
  console.log(props.item);
  // i want to navigate to the post page /post/:id
  useNuxtApp().$router.push(`/post/${props.item.id}`)
}

const closeReplyDialog = () => {
  replyDialog.value = false
}

// watch(reversedParent, (newVal) => {
//   nextTick(() => {
//     setTimeout(() => {
//       const lastIndex = newVal.length - 1;
//       if (timelineRefs.value[lastIndex]) {
//         timelineRefs.value[lastIndex].scrollIntoView({ behavior: 'instant', block: 'end' });
//       }
//     }, 100);
//   });
// }, { immediate: true });

const handleTimeLineBody = () => {
  const lastIndex = reversedParent.value.length - 1;
  const timelineItem = timelineRefs.value[lastIndex];
  // console.log(timelineItem)

  if (timelineItem) {
    const bodyElement = timelineItem.querySelector('.v-timeline-item__body'); 
    if (bodyElement) {
      // bodyElement.scrollIntoView();
      const offset = 84;
      const elementPosition = bodyElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset });
      // console.log('Focused on:', bodyElement);

    } else {
      console.warn('class .v-timeline-item__body not found:', timelineItem);
    }
  } else {
    console.warn('last timelineitem index not found');
  }

}

const handleFileUploaded = (files) => {
  uploadedFiles.value = files; 
  console.log('Files uploaded in Post/index.vue:', files);
};

const handlePostCreated = (newPost) => {
  console.log('Post created in Post/index.vue:', newPost);
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollY.value = window.scrollY
  })
  nextTick(() => {
    setTimeout(() => {
      handleTimeLineBody();
    }, 100); 
  });
})

</script>
