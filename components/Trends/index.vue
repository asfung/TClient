<template>
  <!-- <div class="trend-section"> -->
  <div class="">
    <v-list lines="two" class="dark:bg-black dark:text-white dark:border rounded-lg dark:border-white">
      <v-list-item 
        v-for="trend in trends" 
        :key="trend.id" 
        :title="trend.title"
        :subtitle="trend.subtitle">
        <!-- <v-divider></v-divider> -->
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trends: Array.from({length: 10}, (_, i) => ({
        id: `${ i + 1 }`,
        title: `Tren ${i + 1}`,
        subtitle: `6969 Post`,
      }))
    }
  },
  methods: {
    toggleTrend(trend) {
      trend.isFollowing = !trend.isFollowing
    }
  }
}
</script>

<style>
.trend-section{
  /* border: 1px solid #ddd; */
  border-radius: 5px;
  margin: 11px;
}
</style>