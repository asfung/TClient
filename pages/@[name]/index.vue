<template>
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
            class="rounded-full h-20 w-20"
            :alt="userProfileData?.display_name" />
          <div v-else class="rounded-full bg-gray-300 animate-pulse h-20 w-20"></div>
        </div>
      </div>
      <div class="px-4 max-w-96">
        <p v-if="!isLoadingProfile" class="break-words">{{ userProfileData?.bio }}</p>
        <p v-else class="break-words animate-pulse bg-gray-300 h-12 w-full rounded"></p>
      </div>

      <div class="px-4">
        <div class="flex justify-between">
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

          <div v-if="!userProfileData?.is_me && !isLoadingProfile" class="mt-4 transition-transform duration-200 ease-in-out active:scale-90">
            <button 
              @click="toggleFollowFetch"
              :class="userProfileData?.followed ? 'ring-1 ring-primaryLight dark:ring-primaryDark dark:text-white' : ' bg-primaryLight dark:bg-primaryDark text-white'"
              class="font-bold py-2 px-4 rounded-full">
              {{ userProfileData?.followed ? 'Followed' : 'Follow' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isEditable" class="flex justify-end px-4">
      <PencilSquareIcon class="size-5 hover:cursor-pointer transition-transform duration-200 ease-in-out active:scale-90" @click="dialog = !dialog" />
    </div>
    <DialogUserProfile v-if="userProfileData" :profile-data="userProfileData" :dialog="dialog" @close-dialog="handleCloseProfileDialog" @profile-updated="handleProfileUpdate" />

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
          <div v-if="postsMyself.length > 0">
            <div v-for="(item, index) in postsMyself" :key="index">
              <PostItem :item="item" />
            </div>
          </div>
          <div v-else class="flex justify-center my-4 h-screen">
            <p class="text-gray-500">No Post here</p> 
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="replies">
          <div v-if="postsRepliesMyself.length > 0">
            <div v-for="(item, index) in postsRepliesMyself" :key="index">
              <PostItem :item="item" />
            </div>
          </div>
          <div v-else class="flex justify-center my-4 h-screen">
            <p class="text-gray-500">No Replies here</p> 
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="likes">
          <div v-if="postsLikeMyself.length > 0">
            <div v-for="(item, index) in postsLikeMyself" :key="index">
              <PostItem :item="item" />
            </div>
          </div>
          <div v-else class="flex justify-center my-4 h-screen">
            <p class="text-gray-500">No Liked Post here</p> 
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>

    <div id="checkpoint-section"></div>

    <!-- <DialogUserProfile v-if="userProfileData" :profile-data="userProfileData" :dialog="dialog" @close-dialog="handleCloseProfileDialog" @profile-updated="handleProfileUpdate" /> -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { usePostStore } from '~/stores/Post'
import { useUserStore } from '~/stores/User'
import { useScrollStore } from '~/stores/Scroll'
import { useAuthStore } from '~/stores/Auth';
import { useTheme } from 'vuetify';
import { Credentials } from '~/enums/Credentials'
import { File } from '~/enums/File'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { useTalkerToast } from "~/composables/useTalkerToast"

const showToast = useTalkerToast()
const theme = useTheme();
const route = useRoute();
const username = route.params.name;
const postStore = usePostStore();
const userStore = useUserStore()
const scrollStore = useScrollStore();
const authStore = useAuthStore()

const tab = ref('posts');
const isLoadingProfile = ref(false);
const isFetching = ref(false);
const dialog = ref(false);

const { userProfileData } = storeToRefs(userStore);
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

const {
  scrollYPostsMyself,
  scrollYPostsRepliesMyself,
  scrollYPostsLikesMyself
} = storeToRefs(scrollStore)

const credentialsUser = computed(() => authStore.getCredentials(Credentials.USER))

const isEditable = computed(() => {
  // console.log(userProfileData.value?.id)
  if (!credentialsUser.value.id || !userProfileData.value?.id) return false;
  return credentialsUser.value.id === userProfileData.value?.id
})

onMounted( async () => {
  await userProfileFetch();
  await postsFetch();
  nextTick(() => {
    window.scrollTo(0, getScrollPosition());
    observeSentinel();
  });
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // saving scrollY doesnt worked 
  // maybe reset the scrollY when onUnmounted but if the username is different
  // saveScrollPosition();
  // clearDataOnUnmount()
  window.removeEventListener('scroll', handleScroll);
});

const getScrollPosition = () => {
  switch(tab.value) {
    case 'posts': return scrollYPostsMyself.value;
    case 'replies': return scrollYPostsRepliesMyself.value;
    case 'likes': return scrollYPostsLikesMyself.value;
    default: return 0;
  }
};

const saveScrollPosition = () => {
  switch(tab.value) {
    case 'posts': 
      scrollStore.setScrollYPostsMyself(window.scrollY);
      break;
    case 'replies':
      scrollStore.setScrollYPostsRepliesMyself(window.scrollY);
      break;
    case 'likes':
      scrollStore.setScrollYPostsLikesMyself(window.scrollY);
      break;
  }
};

const handleScroll = () => {
  saveScrollPosition();
};

const userProfileFetch = async () => {
  isLoadingProfile.value = true;
  try {
    const response = await userStore.userProfile(username);
    if (!userProfileData.value || userProfileData.value.username !== response.data.username) {
      userProfileData.value = response.data;
      resetPosts(); 
    }
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

const toggleFollowFetch = async () => {
  const fetch = await userStore.toggleFollow({
    user_id_followed: userProfileData.value.id
  })
  userProfileData.value.followed = fetch.state
  if(fetch.state){
    userProfileData.value.followers_count += 1
  }else{
    userProfileData.value.followers_count -= 1
  }
}

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

watch(tab, async (newTab, oldTab) => {
  saveScrollPosition();
  if (newTab === "posts" && postsMyself.value.length === 0) {
    await postsFetch(postsMyselfPage.value);
  } else if (newTab === "replies" && postsRepliesMyself.value.length === 0) {
    await postsFetch(postsRepliesMyselfPage.value);
  } else if (newTab === "likes" && postsLikeMyself.value.length === 0) {
    await postsFetch(postsLikeMyselfPage.value);
  }
  await nextTick();
  window.scrollTo(0, getScrollPosition());
});

const resetPosts = () => {
  postStore.postsMyself = [];
  postStore.postsMyselfPage = 1;
  postStore.postsMyselfHasNextPage = true;

  postStore.postsRepliesMyself = [];
  postStore.postsRepliesMyselfPage = 1;
  postStore.postsRepliesMyselfHasNextPage = true;

  postStore.postsLikeMyself = [];
  postStore.postsLikeMyselfPage = 1;
  postStore.postsLikeMyselfHasNextPage = true;
};

const handleProfileUpdate = async (updatedProfile) => {
  const file = updatedProfile.profile_image?.file ?? null;
  const display_name = updatedProfile.display_name;
  const bio = updatedProfile.bio;
  const address = updatedProfile.address;
  const payload = { bio, address, display_name };
  let hasChanged = false;

  if (display_name !== userProfileData.value.display_name || bio !== userProfileData.value.bio || address !== userProfileData.value.address) {
    hasChanged = true;
  }

  if (file) {
    hasChanged = true;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', File.PROFILE);
    const fetch = await postStore.uploadMedia(formData);
    userProfileData.value.profile_image = fetch.data;
  }

  if (bio !== userProfileData.value.bio || address !== userProfileData.value.address || display_name !== userProfileData.value.display_name) {
    const fetch = await userStore.updateUser(payload);
    userProfileData.value.display_name = fetch.data.display_name;
    userProfileData.value.bio = fetch.data.bio;
    userProfileData.value.address = fetch.data.address;
    showToast({
      message: 'Berhasil Update User Profile',
      color: 'info',
    })
  }

  if (hasChanged) {
    console.log('updated');
    authStore.setCredentialBy(Credentials.USER, userProfileData.value)
  }

};
const handleCloseProfileDialog = () => {
  dialog.value = false
}
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>