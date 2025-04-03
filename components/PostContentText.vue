<template>
    <!-- <div class="pl-16 text-base width-auto font-medium flex-shrink" v-nuxt-html="parsedContent"></div> -->
    <!-- <div class="pl-16 text-base width-auto font-medium flex-shrink" v-nuxt-html="parsedContent"></div> -->
    <div class="font-base width-auto font-medium flex-shrink break-words" v-nuxt-html="parsedContent"></div>
  </template>
  
  <script setup>
  import { compile, computed, defineProps, h } from 'vue';
  const { $chaosOrb } = useNuxtApp()
  
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
    const mentionRegexSecond = /@(\w+)/g; // grab after @
  
    return props.content
      .replace(/\n/g, '<br>')
      .replace(linkRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`)
      .replace(hashtagRegex, (hashtag) => `<a href="/search?q=${hashtag.slice(1)}" class="text-blue-500 hover:underline ">${hashtag}</a>`)
      // .replace(mentionRegex, (mention) => `<a href="/@${mention.slice(1)}" class="text-blue-500 hover:underline ">${mention}</a>`);
      .replace(mentionRegexSecond, (mention, username) => {
        const sanitizedUsername = String(username || ""); 
        const className = $chaosOrb(sanitizedUsername );
        return `<a href="/@${sanitizedUsername}" class="text-blue-500 hover:underline ${className}">${mention}</a>`;
      });
  });
  //  console.log(parsedContent)
  </script>