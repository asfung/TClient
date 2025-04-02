<template>
  <div class="border-default rounded-lg">
    <!-- {{ posts }} -->
    <div class="user-info">
      <div class="flex justify-between items-center p-4">
        <div>
          <p v-if="!isLoadingProfile" class="font-bold">{{ userProfileData?.display_name }}</p>
          <p v-else class="font-bold animate-pulse bg-gray-300 h-6 w-24 rounded"></p>

          <p v-if="!isLoadingProfile" class="text-neutral">@{{ userProfileData?.username }}</p>
          <p v-else class="text-neutral animate-pulse bg-gray-300 h-4 w-16 rounded mt-1"></p>
        </div>
        <div class="top-8">
          <img 
            v-if="!isLoadingProfile" 
            :src="userProfileData?.profile_image ? $getImage(userProfileData?.profile_image.key) : $randomProfileImage(userProfileData?.display_name || 'user')" 
            class="rounded-full h-14 w-14"
            :alt="userProfileData?.display_name" />
          <div v-else class="rounded-full bg-gray-300 animate-pulse h-14 w-14"></div>
        </div>
      </div>
      <div class="p-4 max-w-96">
        <p v-if="!isLoadingProfile" class="break-words">{{ userProfileData?.bio }}</p>
        <p v-else class="break-words animate-pulse bg-gray-300 h-12 w-full rounded"></p>
        <div class="flex space-between mt-4 space-x-5">
          <p v-if="!isLoadingProfile"> {{ $numberFormat(userProfileData?.followers_count) }} <span class="text-neutral">Followers</span></p>
          <p v-else class="animate-pulse bg-gray-300 h-4 w-16 rounded"></p>

          <p v-if="!isLoadingProfile"> {{ $numberFormat(userProfileData?.following_count) }} <span class="text-neutral">Following</span> </p>
          <p v-else class="animate-pulse bg-gray-300 h-4 w-16 rounded"></p>

          <p v-if="!isLoadingProfile"> {{ $numberFormat(userProfileData?.post_count) }} <span class="text-neutral">Posts</span> </p>
          <p v-else class="animate-pulse bg-gray-300 h-4 w-12 rounded"></p>

          <!-- <button @click="userProfileData.username = 'SULE'">click</button> -->
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
const route = useRoute()

const username = route.params.name
const postStore = usePostStore()
const authStore = useAuthStore()
const scrollStore = useScrollStore()
const tab = ref('posts')
const isLoadingProfile = ref(false)

const { userProfileData } = storeToRefs(authStore)
const posts = computed(() => postStore.posts);
const postsSecond = computed(() => postStore.post);
const postsReply = computed(() => postStore.postsReply);

onMounted(() => {
  userProfileFetch()
  nextTick(() => {
    window.scrollTo(0, scrollStore.scrollYPostsMyself)
  })
  window.addEventListener('scroll', handleScroll)
});

onUnmounted(() => {
  // for now it reset, but if username is same as before its not must reset
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

const userProfileFetch = async () => {
  isLoadingProfile.value = true
  try{
    const fetch = await authStore.userProfile(username)
    // proof: https://x.com/posva/status/1560020538281582592
    userProfileData.value = fetch.data
  }catch(e){}finally{
    isLoadingProfile.value = false
  }
}

</script>

  
<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
  