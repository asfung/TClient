<template>
  <!-- <div class="dark:border-white dark:border dark:rounded"> -->
  <!-- <div class="border-default rounded-lg"> -->
  <div class="" :class="{'border-default rounded': inputPost}">
    <!-- <p>{{ inputPost }}</p> -->
    <div v-if="inputPost" class="flex">
      <div class="m-2 w-10 py-1">
        <img class="inline-block h-10 w-10 rounded-full"
          src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
      </div>
      <div class="flex-1 px-2 pt-2 mt-2">
        <textarea v-model="postMe.content" @input="null" class="bg-transparent text-gray-400 font-medium text-lg w-full overflow-y-scroll scrollable"
          rows="2" cols="50" placeholder="What's happening?"></textarea>

          <div class="image-list mt-4" v-if="fileUploadPrepared.length">
            <UCarousel 
              v-slot="{ item }" 
              :items="fileUploadPrepared" 
              @click.stop
              :ui="{ item: 'mx-1', container: 'pr-5 snap-none scroll-smooth' }"
            >
              <div class="relative">
                <div v-if="item.isLoading" class="absolute inset-0 flex items-center justify-center bg-black/50">
                  Loading...
                </div>
                <img 
                  v-if="item.type.startsWith('image/')" 
                  :src="item.preview" 
                  class="w-full h-32 object-cover rounded"
                />
                <video 
                  v-else-if="item.type === 'video/mp4'" 
                  :src="item.preview" 
                  class="w-full h-32 object-cover rounded" 
                  controls
                />
                <button 
                  @click="removeFile(item)" 
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  × 
                </button>
              </div>
            </UCarousel>
          </div>

        <div class="flex ">
          <div class="flex">
            <div class="flex">
              <div class="flex-1 text-center py-1 m-2">
                <label for="fileInput"
                  class="mt-1 group flex items-center text-primaryLight dark:text-primaryDark hover:bg-primaryLight/50 dark:hover:bg-primaryDark/50 px-2 py-2 text-base leading-6 font-medium rounded-full ">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                </label>
                <input 
                  id="fileInput" 
                  type="file" 
                  accept="image/*,video/mp4,image/gif" 
                  @change="handleFileUpload" 
                  class="hidden"
                  multiple
                />
              </div>

            </div>
          </div>

          <div class="flex-1">
            <button
              @click="handlePostCreate()"
              :disabled="isPostButtonDisabled"
              :class="{'dark:hover:bg-primaryDark hover:bg-primaryLight' : !isPostButtonDisabled}"
              class="bg-neutral mt-5 dark:bg-neutral-dark text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
              Post
            </button>
          </div>
        </div>

        <div>
          <pre>{{ fileUploadPrepared }}</pre>
        </div>

      </div>
    </div>


    <!-- after tweet -->
     <div v-if="inputPost">
      <!-- <hr class="border-gray-600 dark:border-white" /> -->
      <PostItem :item="postMe" />
     </div>
    

    <!-- data tweet -->
    <div v-for="(item, index) in posts" :key="index">
      <!-- <hr class="border-gray-600 dark:border-white" /> -->
      <PostItem :item="item" />
    </div>

    <div id="checkpoint-section"></div>
  </div>

</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/Auth'
import { usePostStore } from '~/stores/Post';
import PostContentText from '../PostContentText.vue';
import { faker } from '@faker-js/faker'
import { File } from '~/enums/File';

const { $axios } = useNuxtApp()
const postStore = usePostStore()
const props = defineProps({
  inputPost: {
    type: Boolean,
    required: false,
    default: true,
  },
});

// state post  me
const posts = computed(() => postStore.posts);
const postHasNextPage = computed(() => postStore.hasNextPage);
const postMe = ref({
  id: `1`,
  profile_image: faker.image.url({ width: 100, height: 100 }),
  username: `JoeGolberg`,
  display_name: `Im Joe Golberg`,
  subtitle: `substile me 1`,
  description: `description me 1`,
  content: '',
  // content: 'Warga Cileungsi! Lagi pengen pecel lele nih, rekomendasi warung pecel lele terenak dan terdekat di Cileungsi dong! 🙏 #pecellele #cileungsi #kuliner',
  show: false,
  liked: false,
  media: [
  ],
});

const isPostButtonDisabled = computed(() => {
  const hasContent = postMe.value.content?.trim().length > 0;
  const hasFiles = fileUploadPrepared.value.length > 0;
  const isUploading = fileUploadPrepared.value.some(file => file.isLoading);
  return (!hasContent && !hasFiles) || isUploading;
});

// state file input
const inputPost = ref(true) 
const fileUploadPrepared = ref([])

// watch content
watch(postMe.content, (newValue) => {
  console.log(newValue);
});

// methods
const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postHasNextPage) {
        postStore.loadMoreData()
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel);
};

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach((file, index) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4']
    if (!allowedTypes.includes(file.type)) return
    const fileData = {
      // TOOD: make it 0,1,2,3 not 0,2,4,6
      index: fileUploadPrepared.value.length + index,
      type: file.type,
      preview: URL.createObjectURL(file),
      isLoading: true,
      file: file 
    }
    fileUploadPrepared.value.push(fileData)
    uploadFile(fileData)
  })
}

const uploadFile = async (fileData) => {
  try {
    const formData = new FormData()
    formData.append('file', fileData.file)
    formData.append('type', File.POST)
    const { response, status, data, message } = await postStore.uploadMedia(formData);
    
    const index = fileUploadPrepared.value.findIndex(item => item.index === fileData.index);
    if (index !== -1) {
        fileUploadPrepared.value[index] = {
          ...fileData,
          ...data,
          isLoading: false
        };
      }
  } catch (error) {
    console.error('Upload failed:', error)
    fileData.isLoading = false
    removeFile(fileData);
  }
}

const removeFile = async (file) => {
  const index = fileUploadPrepared.value.findIndex(item => item.index === file.index);
  const { response, status, data, message} = await postStore.deleteMedia({
    data: file.id
  })
  if (index !== -1 && status === 200) {
    URL.revokeObjectURL(fileUploadPrepared.value[index].preview);
    fileUploadPrepared.value.splice(index, 1);
    fileUploadPrepared.value.forEach((item, idx) => {
      item.index = idx;
    });
  }
};


const handlePostCreate = async () => {
  const { response: responsePost , status: statusPost, data: dataPost, message: messagePost } = await postStore.createPost({
    content: postMe.value.content
  });
  console.log(statusPost)
  console.log(dataPost.id)
  if(fileUploadPrepared.value.length > 0 && statusPost === 201){
    await postStore.editMediaPostId({
      post_id: dataPost.id,
      data: fileUploadPrepared.value
    });
  }
  handleInputClear()
};

const handleInputClear = () => {
  fileUploadPrepared.value = []
  postMe.value.content = ''
  console.log("After clear:", fileUploadPrepared.value, postMe.value.content); // Debug
}

watch(fileUploadPrepared, (newValue) => {
  console.log(newValue);
});

onMounted(() => {
  observeSentinel();
});

onUnmounted(() => {
  fileUploadPrepared.value.forEach(file => {
    URL.revokeObjectURL(file.preview)
  })
})

</script>
