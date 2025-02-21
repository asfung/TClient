<template>
  <div>
    <p>{{ dialog }}</p>
    <v-dialog 
      v-model="props.dialog" 
      width="auto">
        <v-card 
          max-width="400"
          >
          <v-card-item class="">
            <textarea v-model="content" @input="null"
              class="font-medium text-lg w-full overflow-y-scroll scrollable" rows="2" cols="50"
              placeholder="What's happening?"></textarea>
          </v-card-item>
          <v-card-actions>
            <button @click="darkMode($colorMode.preference === 'dark' ? 'light' : 'dark')">MODE {{ $colorMode.preference }}</button>
            <button @click="closeModal">Cancel</button>
          </v-card-actions>
        </v-card>


        <!-- <v-card
          max-width="400"
          >
          <v-card-item>
            <textarea v-model="content" @input="null"
              class="text-gray-400 font-medium text-lg w-full overflow-y-scroll scrollable" rows="2" cols="50"
              placeholder="What's happening?"></textarea>
          </v-card-item>
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Ok"
              @click="dialog = false"
            ></v-btn>
          </template>
        </v-card> -->

    </v-dialog>

  </div>
</template>

<script setup>
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
    default: false
  }, 
  post: {
    required: false,
  }
})

// TODO: understanding advance emit on Vue3
const emit = defineEmits(['update:dialog'])

const darkMode = (newTheme) => {
  useColorMode().preference = newTheme;
}

const closeModal = () => {
  emit('close-dialog')
}


watch(props.dialog, (newVal) => {
  console.log(props.dialog)
})

</script>