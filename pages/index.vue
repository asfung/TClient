<script setup> 
</script>

<template>
  <!-- <v-row justify="space-between" class="spacing-4">
    <v-col class="border border-gray">
      <Profile />
    </v-col>
    <v-col class="border border-gray">
      <Post />
    </v-col>
    <v-col class="border border-gray">
      <Trends />
    </v-col>
  </v-row> -->


  <!-- <div class="container">
    <div class="profile">
      <Profile />
    </div>
    <div class="post">
      <Post />
    </div>
    <div class="trends">
      <Trends />
    </div>
  </div> -->

  <!-- TODO: make it best practice, cause bug found that on mobile the right side width chopped so is like not fit in mobile screen md:w-2/4 is good width size-->
  <div class="flex flex-col md:flex-row justify-between items-start md:mx-6 lg:mx-48">
    <!-- <div class="w-full md:w-1/4 sticky top-14 p-0 border border-gray-300 dark:bg-slate-900 dark:text-white rounded mr-4 md:mr-8"> -->
    <div v-if="$isBreakpoint(['md', 'lg', 'xl'])" class="w-full md:w-1/4 sticky top-14 p-0 border border-gray-300 dark:text-white rounded mr-4 md:mr-8">
      <SideBar />
    </div>
    <!-- <div class="w-full md:w-3/4 p-4 border border-gray-300 dark:bg-slate-900 dark:text-white rounded"> -->
    <div class="w-full md:w-2/4 p-0 dark:text-white rounded dark:border-white dark:border" style="border: 1px solid #d1d5db">
    <!-- <div class="w-full md:w-3/4 p-4 border border-gray-300 dark:border-white dark:text-white rounded"> -->
      <p>{{ $screen }}</p>
      <!-- <p>{{ $isBreakpoint("xl") }}</p> -->
      <!-- sdalkmdlksa -->
       <keep-alive>
        <Post />
       </keep-alive>
    </div>
    <!-- <div class="w-full md:w-1/4 sticky top-14 border border-gray-300 dark:bg-slate-900 dark:text-white rounded ml-4 md:ml-8"> -->
    <div v-if="$isBreakpoint(['md', 'lg', 'xl'])" class="w-full md:w-1/4 sticky top-14 border border-gray-300 dark:text-white rounded ml-4 md:ml-8">
      <Trends />
    </div>
  </div>


</template>

<script>
export default {

}
</script>

<!-- <style>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
}

.profile, .post, .trends {
  /* padding: 1rem; */
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.trends{
  /* top: 2rem; */
  width: 25%; 
  top: 0;
  position: sticky;
}

.profile{
  /* top: 3rem; */
  width: 25%; 
  top: 4rem;
  position: sticky;
}

.post {
  width: 30%; 
  /* min-height: 150vh; */
  /* border: 1px solid #ddd; */
}
</style> -->
