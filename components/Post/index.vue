<template>
  <div :class="{ 'border-default rounded': inputPost }">
    <PostInput 
      :uniqueId="'post-input-main'"
      :inputPost="inputPost" 
      @update:fileUploadPrepared="handleFileUploaded"
      @post-created="handlePostCreated" 
    />

    <div v-for="(item, index) in posts" :key="index">
      <PostItem :item="item" />
    </div>

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePostStore } from '~/stores/Post';

const postStore = usePostStore();
const props = defineProps({
  inputPost: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const posts = computed(() => postStore.posts);
const postHasNextPage = computed(() => postStore.hasNextPage);

const uploadedFiles = ref([]);

const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postHasNextPage) {
        postStore.loadMoreData();
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

onMounted(() => {
  observeSentinel();
});
</script>