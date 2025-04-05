<!-- Quote.vue -->
<template>
  <div class="quote-container border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-2">
    <div class="flex items-start space-x-2">
      <div class="flex-shrink-0">
        <img 
          :src="quote.user.profile_image ? $getImage(quote.user.profile_image.key) : $randomProfileImage(quote.user.display_name)"
          class="h-8 w-8 rounded-full"
          alt=""
        />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-1">
          <NuxtLink 
            :to="`/@${quote.user.username}`"
            @click.stop
            class="font-medium hover:underline"
          >
            {{ quote.user.display_name }}
          </NuxtLink>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            @{{ quote.user.username }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            • {{ $convertToRelativeTime(quote.created_at) }}
          </span>
        </div>
        <PostContentText 
          :content="quote.content ?? ''"
          class="text-gray-700 dark:text-gray-300 mt-1"
        />
        <div v-if="quote.media.length > 0" class="mt-2">
          <UCarousel 
            v-slot="{ item }" 
            :items="quote.media"
            :ui="{ item: 'mx-1', container: 'snap-none scroll-smooth flex items-center' }"
          >
            <img 
              v-if="item.mimetypes.startsWith('image/')"
              :src="$getImage(item.key)"
              width="200"
              class="rounded-lg cursor-pointer duration-200 active:scale-95"
              @click.stop
            />
            <video 
              v-else-if="item.mimetypes === 'video/mp4'"
              :src="$getImage(item.key)"
              class="w-full h-40 object-cover rounded"
              controls
              @click.stop
            />
          </UCarousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  quote: {
    type: Object,
    required: true
  }
})

const { $getImage, $randomProfileImage, $convertToRelativeTime } = useNuxtApp()
</script>

<style scoped>
.quote-container {
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 8px;
}

.dark .quote-container {
  background-color: rgba(255, 255, 255, 0.03);
}
</style>