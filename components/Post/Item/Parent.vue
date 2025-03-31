<template>
  <div class="" v-if="item">
    <div :class="headerClass">
      <ArrowLeftIcon class="size-5 hover:bg-gray-600 hover:rounded-lg" />
      <p>Post</p>
    </div>
    <div class="flex flex-shrink-0 p-4 pb-2 justify-between">
      <v-timeline 
          dot-color="grey-darken-2"
          fill-dot="false"
          align="start" 
          density="compact" 
          :line-color="$colorMode.preference === 'dark' ? 'grey-darken-3' : ''"
          line-inset="8" 
          truncate-line="both"
          >
          <v-timeline-item 
            v-for="(item, index) in reversedParent" 
            :ref="el => setTimelineRef(el, index)"
            @click="(event) => clickPostItem(item,index, event)" 
            @mousedown="startSelection"
            @mouseup="endSelection"
            :class="index === lastIndex ? 'cursor-default' : 'cursor-pointer'"
            class="hover:bg-gray-400 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
            :key="index">
            <template v-slot:icon>
              <TooltipCard v-if="item.user">
                  <template v-slot:body>
                    <img v-bind="props" class="h-10 w-10 rounded-full"
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
              v-if="item"
              :hide-click="index === lastIndex"
              :item="item" 
            />
          </v-timeline-item>

      </v-timeline>
    </div>

    <div class="flex items-center justify-between p-4 border-y">
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
const isSelectingText = ref(false)
const lastIndex = computed(() => reversedParent.value.length - 1);

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


const closeReplyDialog = () => {
  replyDialog.value = false
}

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

  nextTick(() => {
    const timeline = document.querySelector('.v-timeline');
    if (timeline) {
      console.log('v-timeline height:', timeline.offsetHeight, 'px');
    } else {
      console.warn('v-timeline component not found');
    }
  });

})

const clickPostItem = (item, index, event) => {
  if (!isSelectingText.value && index !== lastIndex.value) {
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
