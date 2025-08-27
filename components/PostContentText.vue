<template>
  <!-- <div class="pl-16 text-base width-auto font-medium flex-shrink" v-nuxt-html="parsedContent"></div> -->
  <!-- <div class="pl-16 text-base width-auto font-medium flex-shrink" v-nuxt-html="parsedContent"></div> -->
  <div>
    <div class="font-base width-auto font-medium flex-shrink break-words" v-nuxt-html="parsedContent"></div>

    <div @click.stop v-for="preview in linkPreviews" :key="preview.url" class="mt-3 border rounded-lg shadow-sm p-3 max-w-lg hover:bg-gray-100 dark:hover:bg-gray-800">
      <a :href="preview.url" target="_blank" class="flex gap-3  transition">
        <img v-if="preview.image" :src="preview.image" alt="preview" class="w-20 h-20 object-cover rounded-md">
        <div>
          <h3 class="font-semibold text-sm line-clamp-2">{{ preview.title }}</h3>
          <p class="text-xs text-gray-600 line-clamp-2">{{ preview.description }}</p>
        </div>
      </a>
    </div>

  </div>
</template>

<script setup>
import { compile, computed, defineProps, h } from 'vue';
const { $chaosOrb, $axios } = useNuxtApp()

const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

const linkPreviews = ref([])

const parsedContent = computed(() => {
  if (!props.content) return '';

  const hashtagRegex = /#\w+/g;

  // just great for now
  const linkRegex = /https?:\/\/[^\s]+/g;

  // avoid ?query="dsads", http://localhost:4040/paung?customSay="Bang",
  // so the clickable link is "http://localhost:4040/paung?customSay=" instead of http://localhost:4040/paung?customSay="Bang"
  const linkRegexSecond = /https?:\/\/[^\s<>"']+/g;

  const mentionRegex = /@\w+/g;
  const mentionRegexSecond = /@(\w+)/g;

  let parsed = props.content;

  // replace link
  parsed = parsed.replace(linkRegex, (url) => {
    return `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`;
  });

  // replace link
  parsed = parsed.replace(hashtagRegex, (hashtag) => {
    return `<a href="/search?q=${hashtag.slice(1)}" class="text-blue-500 hover:underline">${hashtag}</a>`;
  });

  // replace mentions
  parsed = parsed.replace(mentionRegexSecond, (mention, username) => {
    const sanitizedUsername = String(username || '');
    const className = $chaosOrb(sanitizedUsername);
    return `<a href="/@${sanitizedUsername}" class="text-blue-500 hover:underline ${className}">${mention}</a>`;
  });

  // replace line breaks
  parsed = parsed.replace(/\n/g, '<br>');

  return parsed;
});

const fetchLinkPreview = async (url) => {
  if (linkPreviews.value.find(p => p.url === url)) return
  try {
    const { data } = await $axios.get(`/LinkPreview?url=${encodeURIComponent(url)}`)
    linkPreviews.value.push(data.data)
  } catch (err) {
    console.error('Preview error:', err)
  }
}

watch( () => props.content,
  (newContent) => {
    if (!newContent) return
    const linkRegex = /https?:\/\/[^\s<>"']+/g
    const urls = newContent.match(linkRegex) || []
    urls.forEach((url) => fetchLinkPreview(url))
  },
  { immediate: true }
)



</script>