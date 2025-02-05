<template>
    <!-- <div class="pl-16 text-base width-auto font-medium flex-shrink" v-html="parsedContent"></div> -->
    <div class="pl-16 text-base width-auto font-medium flex-shrink" v-nuxt-html="parsedContent"></div>
  </template>
  
  <script setup>
  import { compile, computed, defineProps, h } from 'vue';
  
  const props = defineProps({
    content: {
      type: String,
      required: true
    }
  });
  
  const parsedContent = computed(() => {
    if (!props.content) {
      return '';
    }

    const hashtagRegex = /#\w+/g;
    const linkRegex = /https?:\/\/[^\s]+/g;
    const mentionRegex = /@\w+/g;
  
    return props.content
      .replace(/\n/g, '<br>')
      .replace(linkRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`)
      .replace(hashtagRegex, (hashtag) => `<a href="/search?term=${hashtag.slice(1)}" class="text-blue-500 hover:underline ">${hashtag}</a>`)
      .replace(mentionRegex, (mention) => `<a href="/@${mention.slice(1)}" class="text-blue-500 hover:underline ">${mention}</a>`);
  });
   console.log(parsedContent)
  </script>