<template>
  <div>
    <div v-if="inputPost" class="flex">
      <div class="m-2 w-10 py-1">
        <img class="inline-block h-10 w-10 rounded-full"
          :src="$user.profile_image ? $getImage($user.profile_image?.key) : $randomProfileImage($user.display_name)" alt="" />
      </div>
      <div class="flex-1 px-2 pt-2 mt-2">
        <!-- TODO: make the textarea more intuitive -->
        <!-- <textarea v-model="postMe.content" @input="null"
          class="bg-transparent text-gray-400 font-medium text-lg w-full overflow-y-scroll scrollable" rows="2"
          cols="50" placeholder="What's happening?"></textarea> -->
          <TextAreaInput 
            v-model="postMe.content"
            :character-limit="$user.username === 'Paung' ? 999 : 360" 
            @update:overLimit="handleOverLimit"
          />

        <div class="image-list mt-4" v-if="fileUploadPrepared.length">
          <UCarousel v-slot="{ item }" :items="fileUploadPrepared" @click.stop :key="item?.id"
            :ui="{ item: 'mx-1', container: 'pr-5 snap-none scroll-smooth' }">
            <div class="relative">
              <div v-if="item.isLoading" class="absolute inset-0 flex items-center justify-center bg-black/50">
                <!-- Loading... -->
                <v-progress-circular
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
              <img v-if="(item.type?.startsWith('image/') || item.mimetypes?.startsWith('image/'))" :src="item.preview" class="w-full h-32 object-cover rounded" />
              <video v-else-if="(item.type === 'video/mp4' || item.mimetypes === 'video/mp4')" :src="item.preview" class="w-full h-32 object-cover rounded"
                controls />
              <button @click="removeFile(item)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                ×
              </button>
            </div>
          </UCarousel>
        </div>

        <div class="flex">
          <div class="flex">
            <div class="flex-1 text-center py-1 m-2">
              <label :for="uniqueId"
                class="mt-1 group flex items-center text-primaryLight dark:text-primaryDark hover:bg-primaryLight/50 dark:hover:bg-primaryDark/50 px-2 py-2 text-base leading-6 font-medium rounded-full">
                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
              </label>
              <input :id="uniqueId" type="file" accept="image/*,video/mp4,image/gif" @change="handleFileUpload"
                class="hidden" multiple />
            </div>
          </div>

          <div class="flex-1">
            <button @click="handlePostCreate" :disabled="isPostButtonDisabled"
              :class="{ 'dark:hover:bg-primaryDark hover:bg-primaryLight': !isPostButtonDisabled }"
              class="bg-neutral mt-5 dark:bg-neutral-dark text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
              <!-- Post -->
              {{ isEditMode ? 'Update' : 'Post' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { usePostStore } from '~/stores/Post';
import { faker } from '@faker-js/faker';
import { File } from '~/enums/File';
import { useTalkerToast } from "~/composables/useTalkerToast"

const showToast = useTalkerToast()
const { $getImage } = useNuxtApp()
const props = defineProps({
  inputPost: {
    type: Boolean,
    required: false,
    default: true,
  },
  parent_id: {
    type: String,
    required: false,
    default: null,
  },
  postToEdit: { 
    type: Object, 
    default: null 
  },
  typeFor: {
    required: false,
    default: null,
  }
});

const isEditMode = computed(() => !!props.postToEdit);

const emit = defineEmits(['post-created', 'update:fileUploadPrepared', 'post-updated']);

const postStore = usePostStore();

const postMe = ref({
  id: `1`,
  profile_image: faker.image.url({ width: 100, height: 100 }),
  username: `JoeGolberg`,
  display_name: `Im Joe Golberg`,
  subtitle: `substile me 1`,
  description: `description me 1`,
  content: '',
  show: false,
  liked: false,
  media: [],
});

const fileUploadPrepared = ref([]);
const isOverCharacterLimit = ref(false);

// to make reusable component instance are different from each other in the same page
const uniqueId = ref('');
onMounted(() => {
  uniqueId.value = `fileInput-${Math.random().toString(36).substr(2, 9)}`;
  if (isEditMode.value && props.postToEdit) {
    postMe.value.content = props.postToEdit.content;
    fileUploadPrepared.value = props.postToEdit.media?.map((file, index) => ({
      ...file,
      preview: $getImage(file.key), 
      index,
      isLoading: false,
      type: file.mimetypes || file.type
    })) || [];
    console.log(fileUploadPrepared.value)
  }
});

const isPostButtonDisabled = computed(() => {
  const hasContent = (postMe.value.content || '').trim().length > 0; 
  // const hasContent = postMe.value.content?.trim().length > 0;
  const hasFiles = fileUploadPrepared.value.length > 0;
  const isUploading = fileUploadPrepared.value.some(file => file.isLoading);
  return (!hasContent && !hasFiles) || isUploading || isOverCharacterLimit.value;
});

const handleOverLimit = (value) => {
  isOverCharacterLimit.value = value;
};

const generateUid = () => `file-${Math.random().toString(36).substr(2, 9)}`;

const handleFileUpload = (event) => {
  if (!event.target.files) return;

  const files = Array.from(event.target.files);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];

  const newFilesData = [];
  files.forEach((file, index) => {
    if (!allowedTypes.includes(file.type)) {
      console.warn(`File type ${file.type} not supported and was skipped.`);
      return; // skip unsupported files
    }

    newFilesData.push({
      uid: isEditMode.value ? generateUid() : undefined,
      index: isEditMode.value ? undefined : fileUploadPrepared.value.length + index,
      type: file.type,
      preview: URL.createObjectURL(file),
      isLoading: true,
      file,
    });
  });

  if (newFilesData.length === 0) return;

  fileUploadPrepared.value.push(...newFilesData);
  newFilesData.forEach(uploadFile);
  emit('update:fileUploadPrepared', fileUploadPrepared.value);
};



const uploadFile = async (fileData) => {
  try {
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('type', File.POST);
    const { data } = await postStore.uploadMedia(formData);

    // const index = fileUploadPrepared.value.findIndex(item => item.uid === fileData.uid);
    const index = fileData.uid 
      ? fileUploadPrepared.value.findIndex(item => item.uid === fileData.uid)
      : fileUploadPrepared.value.findIndex(item => item.index === fileData.index);
    if (index !== -1) {
      fileUploadPrepared.value[index] = { ...fileData, ...data, isLoading: false };
      emit('update:fileUploadPrepared', fileUploadPrepared.value);
    }
  } catch (error) {
    console.error('Upload failed:', error);
    fileData.isLoading = false;
    removeFile(fileData);
  }
};


const removeFile = async (file) => {
  // let index;
  // if(isEditMode.value){
  //   index = fileUploadPrepared.value.findIndex(item => item.uid === file.uid);
  // }else{
  //   index = fileUploadPrepared.value.findIndex(item => item.index === file.index);
  // }
  const index = file.uid 
    ? fileUploadPrepared.value.findIndex(item => item.uid === file.uid)
    : fileUploadPrepared.value.findIndex(item => item.index === file.index);
  if (index !== -1) {
    if (file.id) {
      const { status } = await postStore.deleteMedia({ data: file.id });
      if (status !== 200) return;
    }
    URL.revokeObjectURL(fileUploadPrepared.value[index].preview);
    fileUploadPrepared.value.splice(index, 1);
    emit('update:fileUploadPrepared', fileUploadPrepared.value);
  }
};


const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const handlePostCreate = debounce(async () => {
  const payload = {
    content: postMe.value.content,
    media: fileUploadPrepared.value,
  };

  let response;
  if (isEditMode.value) {
    response = await postStore.updatePost({
      post_id: props.postToEdit.id,
      ...payload,
    });
  } else {
    if (props.typeFor) {
      payload._for = props.typeFor;
    }
    response = await postStore.createPost({
      parent_id: props.parent_id,
      ...payload,
    });
  }

  if (response?.status === 200 || response?.status === 201) {
    if(isEditMode.value){
      emit('post-updated', response.data)
      showToast({
        message: 'Post Created !',
        color: 'info',
        actionLabel: 'See',
        onAction: () => {
          useNuxtApp().$router.push(`/@${response.data.user.username}/talk/${response.data.id}`)
        }
      })
    }else{
      emit('post-created', response.data);
      showToast({
        message: 'Quote Created !',
        color: 'info',
        actionLabel: 'See',
        onAction: () => {
          useNuxtApp().$router.push(`/@${response.data.user.username}/talk/${response.data.id}`)
        }
      })
    }
    handleInputClear();
  }
}, 500);

const handleInputClear = () => {
  fileUploadPrepared.value = [];
  postMe.value.content = '';
  emit('update:fileUploadPrepared', fileUploadPrepared.value);
};

watch(fileUploadPrepared, (newValue) => {
  // console.log('fileUploadPrepared updated:', newValue);
});

onUnmounted(() => {
  fileUploadPrepared.value.forEach(file => URL.revokeObjectURL(file.preview));
});
</script>