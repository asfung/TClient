<template>
  <div class="border-default rounded-lg">
    <PostItemParent :item="parentPost" />
  </div>
</template>

<script setup>
const parentPost = ref({
  id: `1`,
  username: `user`,
  title: `selekences `,
  subtitle: `selekencess cessss `,
  description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl `,
  // content: this.contentData,
  contentData: "https://www.trpkovski.com/2024/03/24/is-it-possible-to-use-nuxt-link-in-content-rendered-with-v-html @Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie ",
  show: false,
  liked: false,
  media: [
    'https://picsum.photos/600/800?random=1',
    'https://picsum.photos/600/800?random=2',
    'https://picsum.photos/600/800?random=3',
    'https://picsum.photos/600/800?random=4',
    'https://picsum.photos/600/800?random=5',
    'https://picsum.photos/600/800?random=6'
  ],
})
</script>