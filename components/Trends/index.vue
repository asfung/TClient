<template>
  <div class="trend-section rounded-lg ">
    <h2 class="px-4 pb-2 font-semibold text-lg">Trending</h2>
    <div class="flex flex-wrap gap-2 mt-4 px-4">
      <div v-for="(trend, index) in hashtags" :key="index">
        <NuxtLink :to="`/search?q=${trend.tag_name}`">
          <v-chip class="text-primaryLight dark:text-primaryDark" variant="outlined" link >
              <p class="font-semibold">{{ trend.tag_name }}</p>
          </v-chip>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { faker } from '@faker-js/faker'
import { useTagStore } from '~/stores/Tag'

const tagStore = useTagStore()
const {
  tags,
  mentions,
  hashtags
} = storeToRefs(tagStore)

onMounted(() => {
})

const trends = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  title: faker.word.noun(),
}));
</script>
