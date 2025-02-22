<!-- <template>
  <div class="trend-section rounded-lg border-y-red-300">
    <h2 class="px-4 pb-2 font-semibold text-lg">Trending</h2>
    <div class="flex flex-wrap gap-2 mt-4 px-4">
      <span v-for="(trend, index) in trends" :key="index"
        class="bg-gray-200 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-300 dark:hover:bg-primaryDark dark:bg-opacity-20 transition-colors cursor-pointer">
        #{{ trend.title }}
      </span>
    </div>
  </div>
</template>

<script setup>

const trends = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Trend ${i + 1}`,
  subtitle: `${Math.floor(Math.random() * 10000)} Posts`,
  isFollowing: false,
}));

// tidak penting
const toggleTrend = (trend) => {
  trend.isFollowing = !trend.isFollowing;
};


</script> -->

<template>
  <div class="trend-section rounded-lg ">
    <h2 class="px-4 pb-2 font-semibold text-lg">Trending</h2>
    <div class="flex flex-wrap gap-2 mt-4 px-4">
      <span
        v-for="(trend, index) in trends"
        :key="index"
        class="bg-gray-200 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-300 dark:hover:bg-primaryDark dark:bg-opacity-20 transition-colors cursor-pointer"
      >
        #{{ trend.title }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { faker } from '@faker-js/faker'

const trends = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  title: faker.word.noun(),
}));
</script>
