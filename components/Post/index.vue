<template>
  <div :class="{ 'border-default rounded': inputPost }">
    <PostInput 
      v-if="inputPost"
      :uniqueId="'post-input-main'"
      :inputPost="inputPost" 
      @update:fileUploadPrepared="handleFileUploaded"
      @post-created="handlePostCreated" 
    />

    <div v-for="(item, index) in displayPosts" :key="index">
      <PostItem :item="item" />
    </div>

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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
  hasNextPage: {
    type: Boolean,
    default: false,
  }, 
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['load-more']);

const uploadedFiles = ref([]);

const displayPosts = computed(() => props.posts);

const observeSentinel = () => {
  // console.log(props.currentPage)
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && props.hasNextPage) {
        // props.currentPage += 1;
        // emit('load-more', props.currentPage);
        const nextPage = props.currentPage + 1;
        emit('load-more', nextPage);
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
};

const handleFileUploaded = (files) => {
  uploadedFiles.value = files;
  console.log('Files uploaded:', files);
};

const handlePostCreated = (newPost) => {
  console.log('Post created:', newPost);
};

onMounted(() => {
  observeSentinel();
});
</script>