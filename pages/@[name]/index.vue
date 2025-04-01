<template>
  <div class="border-default rounded-lg">
    <!-- {{ posts }} -->
    <div class="user-info">
      <div class="flex justify-between items-center p-4">
        <div>
          <p class="font-bold">Mark Sucker</p>
          <p class="text-neutral">@Mark</p>
        </div>
        <div class="top-8">
          <img src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" class="rounded-full"
            alt="Bonnie image" />
        </div>
      </div>
      <div class="p-4 max-w-96">
        <p class="break-words">get up the phone and touch grass</p>
        <div class="flex space-between mt-4 space-x-5">
          <p>
            2121
            <span class="text-neutral">Followers</span>
          </p>
          <p>
            78
            <span class="text-neutral">Following</span>
          </p>
          <p>
            3
            <span class="text-neutral">Posts</span>
          </p>
        </div>
      </div>
    </div>

    <div class="tab">
      <v-tabs 
        v-model="tab" 
        color="primary" 
        class="sticky dark:text-white">
        <v-tab text="Posts" value="posts" :ripple="false">Posts</v-tab>
        <v-tab text="Replies" value="replies"  :ripple="false">Replies</v-tab>
        <v-tab text="Likes" value="likes" :ripple="false">Likes</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="posts">
          <Post :input-post="false" :posts="posts" />
        </v-tabs-window-item>

        <v-tabs-window-item value="replies">
          <Post :input-post="false" :posts="posts" />
        </v-tabs-window-item>

        <v-tabs-window-item value="likes">
          <Post :input-post="false" :posts="posts" />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>

  </div>
</template>
  
  
<script setup>
import { computed, onMounted } from 'vue';
import { usePostStore } from '~/stores/Post';
import { useAuthStore } from '~/stores/Auth';
import { useScrollStore } from '~/stores/Scroll';
import { useTheme } from 'vuetify';

const theme = useTheme()

const postStore = usePostStore()
const authStore = useAuthStore()
const scrollStore = useScrollStore()
const tab = ref('posts')

const posts = computed(() => postStore.posts);
const postsSecond = computed(() => postStore.post);
const token = computed(() => authStore.token);
const postsReply = computed(() => postStore.postsReply);

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, scrollStore.scrollYPostsMyself)
  })
  window.addEventListener('scroll', handleScroll)
});

onUnmounted(() => {
  // console.log('reset the scrollY')
  scrollStore.setScrollYscrollYPostsMyself(0)
  scrollStore.setScrollYscrollYPostsRepliesMyself(0)
  scrollStore.setScrollYscrollYPostsLikesMyself(0)
  // window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  switch(tab.value){
    case 'posts':
      scrollStore.setScrollYscrollYPostsMyself(window.scrollY)
      break
    case 'replies':
      scrollStore.setScrollYscrollYPostsRepliesMyself(window.scrollY)
      break
    case 'likes':
      scrollStore.setScrollYscrollYPostsLikesMyself(window.scrollY)
      break
  }
}

watch(tab, async(newTab, oldTab) => {
  switch(oldTab){
    case 'posts':
      scrollStore.setScrollYscrollYPostsMyself(window.scrollY)
      break
    case 'replies':
      scrollStore.setScrollYscrollYPostsRepliesMyself(window.scrollY)
      break
    case 'likes':
      scrollStore.setScrollYscrollYPostsLikesMyself(window.scrollY)
      break
  }
  await nextTick()
  switch(newTab){
    case 'posts':
      window.scrollTo(0, scrollStore.scrollYPostsMyself)
      break;
    case 'replies':
      window.scrollTo(0, scrollStore.scrollYPostsRepliesMyself)
      break;
    case 'likes':
      window.scrollTo(0, scrollStore.scrollYPostsLikesMyself)
      break;
  }
})

</script>

  
<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
  