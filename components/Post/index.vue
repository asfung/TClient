<template>
  <div :class="{ 'border-default rounded': inputPost }">
    <PostInput 
      :uniqueId="'post-input-main'"
      :inputPost="inputPost" 
      @update:fileUploadPrepared="handleFileUploaded"
      @post-created="handlePostCreated" 
    />

    <div v-for="(item, index) in posts.value" :key="index">
      <PostItem :item="item" />
    </div>

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { usePostStore } from '~/stores/Post';

const postStore = usePostStore();
const props = defineProps({
  inputPost: {
    type: Boolean,
    required: false,
    default: true,
  },
  posts: {
    type: Array,
    required: false,
    default: () => [],
  },
});
const activeTab = computed(() => postStore.activeTab);
const postForYou = computed(() => postStore.posts);
const postFollowing = computed(() => postStore.postsFollowing);
const route = useRoute()

// myself 
const postMyself = computed(() => postStore.postsMyself);
const postLikeMyself = computed(() => postStore.postsLikeMyself);
const postRepliesMyself = computed(() => postStore.postRepliesMyself);

const posts = computed(() => {
    if(activeTab.value === 'forYou') {
      console.log('For you');
      return postForYou
    } else if (activeTab.value === 'following') {
      console.log('Following');
      console.log(postFollowing)
      return postFollowing
    } else if (activeTab.value === 'bookmarks') {
      console.log('Bookmarks');
      return postStore.postsBookmark
    } else if (activeTab.value === 'search') {
      console.log('Search');
      return postStore.postsSearch
    } else if (activeTab.value === 'profile') {
      console.log('Profile');
      return postMyself
    } else if (activeTab.value === 'posts'){
      return postMyself
    }else if (activeTab.value === 'likes'){
      return postLikeMyself
    }else if (activeTab.value === 'replies'){
      return postRepliesMyself
    }
  }
);

// const posts = computed(() => postStore.posts);
const postHasNextPage = computed(() => postStore.hasNextPage);
const uploadedFiles = ref([]);
const currentPage = ref(1);
const isHomePage = computed(() => route.name === 'index'); 

const loadPosts = async () => {
  const payload = {
    type: activeTab.value === 'forYou' ? 'foryou' : 'following',
    page: currentPage.value,
  };
  await postStore.getPost(payload);
};

// loading more posts when the sentinel is in view
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting && postStore.hasNextPage) {
        currentPage.value += 1;
        await loadPosts();
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
};

const handleFileUploaded = (files) => {
  uploadedFiles.value = files; 
  console.log('Files uploaded in Post/index.vue:', files);
};

const handlePostCreated = (newPost) => {
  console.log('Post created in Post/index.vue:', newPost);
};

onMounted(async () => {
  // console.log(route.name);
  // await loadPosts();
  // observeSentinel();
  if (isHomePage.value) {
    await loadPosts();
    observeSentinel();
  }
});

// i mean if the posts is exist dont make the api call again
watch(route, async (newRoute) => {
  if (newRoute.name === 'index') {
    currentPage.value = 1;
    await loadPosts();
  }else if(newRoute.name === 'bookmark') {
    console.log('Bookmark page');
  }
  console.log('Route changed:', newRoute.name);
});

watch(activeTab, async (newTab) => {
  currentPage.value = 1;
  await loadPosts();
});
</script>