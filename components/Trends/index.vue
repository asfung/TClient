<template>
  <div class="trend-section">
    <v-list lines="two" class="dark:bg-black dark:text-white bg-gray-100 text-gray-900 rounded-lg shadow-md overflow-hidden">
      <!-- Wrapper Scroll -->
      <div class="scrollable-content">
        <v-list-item v-for="trend in trends" :key="trend.id" class="flex items-center justify-between px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-md">
          <div class="flex items-center space-x-4">
            <!-- Ikon Tren -->
            <v-icon color="blue" class="text-lg">mdi-trending-up</v-icon>

            <!-- Judul dan Subtitle -->
            <div>
              <v-list-item-title class="font-semibold">{{ trend.title }}</v-list-item-title>
              <v-list-item-subtitle class="text-sm text-gray-500 dark:text-gray-400">{{ trend.subtitle }}</v-list-item-subtitle>
            </div>
          </div>

          <!-- Tombol Follow -->
          <!-- <button @click="toggleTrend(trend)" :class="['py-1 px-3 rounded-lg text-sm font-medium transition-colors', trend.isFollowing ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white']">
            {{ trend.isFollowing ? "Following" : "Follow" }}
          </button> -->
        </v-list-item>

        <!-- Divider -->
        <v-divider v-if="!$last" />
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trends: Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Trend ${i + 1}`,
        subtitle: `${Math.floor(Math.random() * 10000)} Posts`,
        isFollowing: false,
      })),
    };
  },
  methods: {
    toggleTrend(trend) {
      trend.isFollowing = !trend.isFollowing;
    },
  },
};
</script>

<style>
.trend-section {
  margin: 20px;
  border-radius: 8px; /* Border radius untuk sudut yang lebih lembut */
  border: 2px solid #777575; /* Garis tepi berwarna hijau */
}

.scrollable-content {
  max-height: 400px; /* Batasi tinggi maksimal */
  overflow-y: scroll; /* Aktifkan scroll */
}

.scrollable-content::-webkit-scrollbar {
  width: 0; /* Sembunyikan scrollbar di WebKit */
}

.scrollable-content {
  scrollbar-width: none; /* Hilangkan scrollbar di Firefox */
}

.scrollable-content::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>
