<template>
  <div class="trend-section border-default rounded-lg">
    <v-list lines="two" class="bg-gray-100 dark:bg-black text-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden">
    <h2 class="px-4 pb-2 font-semibold text-lg">Trending</h2>
      <div class="scrollable max-h-96 overflow-y-auto">
        <v-list-item v-for="trend in trends" :key="trend.id" class="flex items-center justify-between px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-md">
          <div class="flex items-center space-x-4">

            <NuxtLink :to="`/search?q=${trend.title}`">
              <div>
                <v-list-item-subtitle class="text-sm text-gray-500 dark:text-gray-400">Hashtag</v-list-item-subtitle>
                <v-list-item-title class="font-semibold">#{{ trend.title }}</v-list-item-title>
                <!-- <v-list-item-subtitle class="text-sm text-gray-500 dark:text-gray-400">{{ trend.subtitle }}</v-list-item-subtitle> -->
              </div>
            </NuxtLink>
          </div>

          <!-- Tombol Follow -->
          <!-- <button @click="toggleTrend(trend)" :class="['py-1 px-3 rounded-lg text-sm font-medium transition-colors', trend.isFollowing ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white']">
            {{ trend.isFollowing ? "Following" : "Follow" }}
          </button> -->
        </v-list-item>

        <!-- Divider -->
        <!-- <v-divider v-if="!$last" /> -->
      </div>
    </v-list>
  </div>
</template>

<script setup>

const trends = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Trend ${i + 1}`,
  subtitle: `${Math.floor(Math.random() * 10000)} Posts`,
  isFollowing: false,
}));

// tidak penting
const toggleTrend = (trend) => {
  trend.isFollowing = !trend.isFollowing;
};


</script>