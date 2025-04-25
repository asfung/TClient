<template>
  <v-menu v-model="isTooltipVisible" open-on-hover :close-on-content-click="false" location="bottom center"
    @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot name="body" ></slot>
      </div>
    </template>
    <div class="">
      <slot name="tooltip"></slot>
    </div>
  </v-menu>
</template>

<script setup>
const isTooltipVisible = ref(false);
let timeoutSecond;
const props = defineProps({
  modelValue: {

  }
})

const showTooltip = () => {
  clearTimeout(timeoutSecond);
  setTimeout(() => {
    isTooltipVisible.value = true;
  }, 500);
};

const hideTooltip = () => {
  clearTimeout(timeoutSecond);
  isTooltipVisible.value = false;
};
</script>
