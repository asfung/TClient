<template>
  <!-- Template remains unchanged as it looks structurally sound -->
  <div class="border-default rounded-lg">
    <div class="user-info">
      <div class="flex justify-between items-center p-4">
        <div>
          <p 
            v-if="!isLoadingProfile" 
            :class="$chaosOrb(userProfileData?.username)"
            class="font-bold">
            {{ userProfileData?.display_name }}
          </p>
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
      <div class="px-4 max-w-96">
        <p v-if="!isLoadingProfile" class="break-words">{{ userProfileData?.bio }}</p>
        <p v-else class="break-words animate-pulse bg-gray-300 h-12 w-full rounded"></p>
      </div>

      <div class="px-4">
        <div class="flex flex-wrap sm:justify-start gap-4 mt-4">
          <div class="flex items-center">
            <p v-if="!isLoadingProfile" class="text-lg font-medium">
              {{ $numberFormat(userProfileData?.followers_count) }}
            </p>
            <p v-else class="animate-pulse bg-gray-300 h-4 w-12 rounded"></p>
            <span class="text-neutral ml-1 text-sm">Followers</span>
          </div>
          
          <div class="flex items-center">
            <p v-if="!isLoadingProfile" class="text-lg font-medium">
              {{ $numberFormat(userProfileData?.following_count) }}
            </p>
            <p v-else class="animate-pulse bg-gray-300 h-4 w-12 rounded"></p>
            <span class="text-neutral ml-1 text-sm">Following</span>
          </div>
          
          <div class="flex items-center">
            <p v-if="!isLoadingProfile" class="text-lg font-medium">
              {{ $numberFormat(userProfileData?.post_count) }}
            </p>
            <p v-else class="animate-pulse bg-gray-300 h-4 w-12 rounded"></p>
            <span class="text-neutral ml-1 text-sm">Posts</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tab">
      <v-tabs 
        v-model="tab" 
        color="primary" 
        class="sticky dark:text-white">
        <v-tab text="Posts" value="posts" :ripple="false">Posts</v-tab>
        <v-tab text="Replies" value="replies" :ripple="false">Replies</v-tab>
        <v-tab text="Likes" value="likes" :ripple="false">Likes</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="posts">
          <div v-for="(item, index) in postsMyself" :key="index">
            <PostItem :item="item" />
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="replies">
          <div v-for="(item, index) in postsRepliesMyself" :key="index">
            <PostItem :item="item" />
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="likes">
          <div v-for="(item, index) in postsLikeMyself" :key="index">
            <PostItem :item="item" />
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '~/stores/Post';
import { useAuthStore } from '~/stores/Auth';
import { useScrollStore } from '~/stores/Scroll';
import { useTheme } from 'vuetify';

const theme = useTheme();
const route = useRoute();
const username = route.params.name;
const postStore = usePostStore();
const authStore = useAuthStore();
const scrollStore = useScrollStore();

const tab = ref('posts');
const isLoadingProfile = ref(false);
const isFetching = ref(false);

const { userProfileData } = storeToRefs(authStore);
const {
  postsMyself,
  postsMyselfPage,
  postsMyselfHasNextPage,
  postsRepliesMyself,
  postsRepliesMyselfPage,
  postsRepliesMyselfHasNextPage,
  postsLikeMyself,
  postsLikeMyselfPage,
  postsLikeMyselfHasNextPage,
} = storeToRefs(postStore);

const posts = computed(() => {
  switch(tab.value) {
    case 'posts': return postsMyself.value;
    case 'replies': return postsRepliesMyself.value;
    case 'likes': return postsLikeMyself.value;
    default: return [];
  }
});

onMounted(() => {
  userProfileFetch();
  postsFetch();
  nextTick(() => {
    window.scrollTo(0, getScrollPosition());
    observeSentinel();
  });
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // saving scrollY doesnt worked 
  // TODO:
  // 1. make scrollY working again 
  // 2. are clicking of PostReplyItem not to fit on Parent.vue
  // 3. psots myself not fetching when refresh the page, and clearing data still not working 
  // saveScrollPosition();
  clearDataOnUnmount()
  window.removeEventListener('scroll', handleScroll);
});

const getScrollPosition = () => {
  switch(tab.value) {
    case 'posts': return scrollStore.scrollYPostsMyself;
    case 'replies': return scrollStore.scrollYPostsRepliesMyself;
    case 'likes': return scrollStore.scrollYPostsLikesMyself;
    default: return 0;
  }
};

const saveScrollPosition = () => {
  switch(tab.value) {
    case 'posts':
      scrollStore.setScrollYscrollYPostsMyself(window.scrollY);
      break;
    case 'replies':
      scrollStore.setScrollYscrollYPostsRepliesMyself(window.scrollY);
      break;
    case 'likes':
      scrollStore.setScrollYscrollYPostsLikesMyself(window.scrollY);
      break;
  }
};

const handleScroll = () => {
  saveScrollPosition();
};

const userProfileFetch = async () => {
  isLoadingProfile.value = true;
  try {
    const response = await authStore.userProfile(username);
    userProfileData.value = response.data;
  } catch (e) {
    console.error('Error fetching profile:', e);
  } finally {
    isLoadingProfile.value = false;
  }
};

const postsFetch = async (page = 1) => {
  if (isFetching.value) return;
  isFetching.value = true;
  
  try {
    await postStore.getPost({
      type: tab.value,
      page,
      user_id: userProfileData.value.id,
      // username,
    });
  } catch (e) {
    console.error('Error fetching posts:', e);
  } finally {
    isFetching.value = false;
  }
};

const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isFetching.value) {
        const hasNextPage = tab.value === 'posts' ? postsMyselfHasNextPage.value :
                          tab.value === 'replies' ? postsRepliesMyselfHasNextPage.value :
                          postsLikeMyselfHasNextPage.value;
        const currentPage = tab.value === 'posts' ? postsMyselfPage.value :
                          tab.value === 'replies' ? postsRepliesMyselfPage.value :
                          postsLikeMyselfPage.value;
        
        if (hasNextPage) {
          postsFetch(currentPage + 1);
        }
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
};

const clearDataOnUnmount = () => {
  postsMyself.value = []
  postsMyselfPage.value = 1
  postsMyselfHasNextPage.value = true
  postsRepliesMyself.value = []
  postsRepliesMyselfPage.value = 1
  postsRepliesMyselfHasNextPage.value = true
  postsLikeMyself.value = []
  postsLikeMyselfPage.value = 1
  postsLikeMyselfHasNextPage.value = true
  userProfileData.value = null
}

watch(tab, async (newTab, oldTab) => {
  saveScrollPosition();
  await postsFetch(1);
  await nextTick();
  window.scrollTo(0, getScrollPosition());
});
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>