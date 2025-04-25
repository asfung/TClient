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
import { useTalkerToast } from "~/composables/useTalkerToast"

const showToast = useTalkerToast()
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
const isFetching = ref(false); 
const displayPosts = computed(() => props.posts);

const observeSentinel = () => {
  // console.log(props.currentPage)
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && props.hasNextPage && !isFetching.value) {
        isFetching.value = true; 
        const nextPage = props.currentPage + 1;
        emit('load-more', nextPage);

        setTimeout(() => {
          isFetching.value = false; 
        }, 2000); // unstable code tho
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
  displayPosts.value.unshift(newPost)
};

onMounted(() => {
  observeSentinel();
});
</script>