<template>
  <v-dialog v-model="isDialogOpen" width="600">
    <div
      class="relative border rounded-lg bg-gray-200 text-gray-900 dark:bg-neutral-dark dark:text-white border-gray-300 dark:border-neutral-700 shadow-md py-4 px-6"
    >
      <button
        class="absolute top-2 right-2 bg-gray-200 dark:bg-neutral-dark rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
        @click="closeDialog"
        aria-label="Close dialog"
      >
        &times;
      </button>

      <div class="mt-4 space-y-4">
        <h3 class="text-lg font-bold mb-2">Edit Profile</h3>

        <div class="flex items-center space-x-6">
          <div class="shrink-0">
            <img
              :src="imagePreview"
              alt="Profile Preview"
              class="h-16 w-16 object-cover rounded-full"
            />
          </div>
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              @change="handleImageChange"
              accept="image/*"
              class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
          </label>
        </div>

        <div>
          <label class="text-sm font-semibold block mb-1">Display Name</label>
          <input
            type="text"
            v-model="editableProfile.display_name"
            class="w-full border p-2 rounded bg-gray-200 dark:bg-neutral-dark text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label class="text-sm font-semibold block mb-1">Bio</label>
          <TextAreaInput 
            :placeholder="'tell\' em brooo'"
            v-model="editableProfile.bio"
            :character-limit="100" 
            @update:overLimit="handleOverLimit"
          />
        </div>

        <div>
          <label class="text-sm font-semibold block mb-1">Address</label>
          <input
            type="text"
            v-model="editableProfile.address"
            class="w-full border p-2 rounded bg-gray-200 dark:bg-neutral-dark text-gray-900 dark:text-white"
          />
        </div>

        <div class="flex justify-end mt-4">
          <button
            :disabled="handleDisableSave"
            @click="saveProfile"
            class="bg-primaryLight dark:bg-primaryDark text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  dialog: Boolean,
  profileData: {
    type: Object,
    required: true,
    default: () => ({}) 
  }
});
const { $getImage, $randomProfileImage } = useNuxtApp();

const isOverCharacterLimit = ref(false)
const isDialogOpen = ref(props.dialog);
const emit = defineEmits(['update:dialog', 'profile-updated', 'close-dialog']);

watch(() => props.dialog, (val) => {
  isDialogOpen.value = val;
});

watch(isDialogOpen, (val) => {
  emit('update:dialog', val);
  if (!val) emit('close-dialog');
});

const imagePreview = ref('');

const editableProfile = reactive({
  display_name: '',
  bio: '',
  address: '',
  profile_image: {},
});

watch(isDialogOpen, (val) => {
  emit('update:dialog', val);
  if (!val) {
    emit('close-dialog');
    resetEditableProfile(); 
  } else {
    editableProfile.display_name = props.profileData.display_name || '';
    editableProfile.bio = props.profileData.bio || '';
    editableProfile.address = props.profileData.address || '';
    editableProfile.profile_image = { ...(props.profileData.profile_image || {}) };

    imagePreview.value =
      props.profileData?.profile_image?.key && typeof props.profileData.profile_image.key === 'string'
        ? $getImage(props.profileData.profile_image.key)
        : $randomProfileImage(props.profileData.display_name);
  }
});

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.value = reader.result;
  };
  reader.readAsDataURL(file);

  editableProfile.profile_image = {
    ...editableProfile.profile_image,
    file,
    key: file.name
  };
};

const closeDialog = () => {
  isDialogOpen.value = false;
  resetEditableProfile();
};

const resetEditableProfile = () => {
  editableProfile.display_name = ''
  editableProfile.bio = '';
  editableProfile.address = '';
  editableProfile.profile_image = {};
  imagePreview.value = '';
};

const handleDisableSave = computed(() => {
  return isOverCharacterLimit.value;
});


const handleOverLimit = (value) => {
  isOverCharacterLimit.value = value;
};

const saveProfile = () => {
  const payload = {
    ...editableProfile,
    profile_image: { ...editableProfile.profile_image },
  };

  if (editableProfile.profile_image?.file) {
    payload.profile_image_file = editableProfile.profile_image.file;
  }

  emit('profile-updated', payload);
  closeDialog();

};
</script>
