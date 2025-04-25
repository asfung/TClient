<template>
  <div>
    <v-dialog v-model="props.dialog" width="600">
      <p v-if="props.typeFor && props.typeFor === 'quote'" class="font-base-bold">Quoting</p>
      <div
        class="relative border-2 border-primaryLight dark:border-primaryDark rounded-lg dark:bg-black dark:text-white bg-gray-100 text-gray-900 shadow-md py-4 px-6 backdrop-blur-md bg-opacity-20 dark:backdrop-blur-md dark:bg-opacity-50"
      >
        <button
          class="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          @click="closeModal"
          aria-label="Close dialog"
        >
          &times;
        </button>
        <PostInput
          class="mt-4"
          :type-for="props.typeFor"
          :uniqueId="'post-input-dialog'"
          :inputPost="true"
          :parent_id="props.parent_id"
          :post-to-edit="props.postToEdit"
          @update:fileUploadPrepared="handleFileUploaded"
          @post-created="handlePostCreated"
          @post-updated="handlePostUpdated"
        />
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePostStore } from '~/stores/Post';

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
    default: false,
  },
  post: {
    required: false,
  },
  parent_id: {
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
  },
});

const emit = defineEmits(['update:dialog', 'post-created', 'post-updated', 'close-dialog']);

const closeModal = () => {
  emit('close-dialog');
};

const uploadedFiles = ref([]);

const handleFileUploaded = (files) => {
  uploadedFiles.value = files;
  // console.log('Files uploaded in Dialog/TextArea.vue:', files);
};

const handlePostCreated = (newPost) => {
  // console.log('Post created in Dialog/TextArea.vue:', newPost);
  emit('post-created', newPost)
  closeModal();
};

const handlePostUpdated = (updatedPost) => {
  // console.log('Post updated in Dialog/TextArea.vue:', updatedPost);
  emit('post-updated', updatedPost)
  closeModal();
}
</script>