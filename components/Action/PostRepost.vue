<template>
  <div class="flex items-center py-1">
    <button
      class="group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-success hover:bg-opacity-10 hover:text-success transition-transform duration-200 ease-in-out active:scale-90">
      <svg class="h-7 w-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        stroke="currentColor" viewBox="0 0 24 24">
        <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
      </svg>
      <div class="ml-1">
        <NumberCounter :count="props.count" />
      </div>
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  count: {
    required: true,
  }
})

</script>