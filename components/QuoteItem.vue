<template>
  <div 
    @click.stop="clickPostItem()" 
    @mousedown="startSelection"
    @mouseup="endSelection"
    class="border hover:bg-gray-400 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20 border-gray-300 dark:border-gray-600 rounded-lg p-3 mt-2 w-full">
    <!-- class="border border-gray-300 dark:border-gray-600 rounded-lg p-3 mt-2 w-full"> -->
    <div class="flex items-start gap-3">
      <img
        class="w-10 h-10 rounded-full"
        :src="quote.user.profile_image ? $getImage(quote.user.profile_image.key) : $randomProfileImage(quote.user.display_name)"
        alt="User Avatar"
      />
      <div>
        <NuxtLink :to="`/@${quote.user.username}`" class="hover:underline font-semibold">
          {{ quote.user.display_name }}
        </NuxtLink>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          @{{ quote.user.username }} · {{ $convertToRelativeTime(quote.created_at) }}
        </p>
        <p class="mt-1 text-base break-words whitespace-pre-wrap">
          {{ quote.content }}
        </p>
      </div>
    </div>

    <div v-if="quote.media?.length" class="mt-2">
      <UCarousel
        v-slot="{ item }"
        :items="quote.media"
        :ui="{ item: 'mx-1', container: 'pl-0 pr-5 snap-none scroll-smooth flex items-center' }"
      >
        <img
          v-if="item.mimetypes.startsWith('image/')"
          :src="$getImage(item.key)"
          width="300"
          draggable="true"
          class="rounded-lg cursor-pointer duration-200 active:scale-95"
          @click.stop
        />
        <video
          v-else-if="item.mimetypes === 'video/mp4'"
          :src="$getImage(item.key)"
          class="w-full h-52 object-cover rounded"
          controls
          @click.stop
        />
      </UCarousel>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  quote: {
    type: Object,
    required: true,
  },
})

const isSelectingText = ref(false)


const startSelection = () => {
  isSelectingText.value = false;
};

const endSelection = () => {
  const selection = window.getSelection().toString();
  if (selection.length > 0) {
    isSelectingText.value = true;
  }
};

const clickPostItem = () => {
  if (!isSelectingText.value) {
    useNuxtApp().$router.push(`/@${props.quote.user.username}/talk/${props.quote.id}`);
  }
}
</script>
