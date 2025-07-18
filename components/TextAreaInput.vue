<template>
  <div class="character-limit-input flex flex-col gap-2">
    <textarea
      ref="textareaRef"
      :value="modelValue"
      @input="handleInput"
      :placeholder="props.placeholder"
      :class="{ 'over-limit': isOverLimit }"
      class="bg-transparent text-gray-400 font-medium text-lg w-full resize-none p-2 rounded min-h-[40px]"
    ></textarea>
    <!-- <div v-if="modelValue.length > 0" class="progress-container flex items-center gap-2 text-sm text-gray-600"> -->
    <div v-if="(modelValue || '').length > 0" class="progress-container flex items-center gap-2 text-sm text-gray-600">
      <svg class="progress-circle w-6 h-6 -rotate-90" width="24" height="24">
        <circle
          class="progress-circle-bg"
          cx="12"
          cy="12"
          r="10"
          stroke-width="2"
          fill="none"
          stroke="#e0e0e0"
        />
        <circle
          class="progress-circle-fill"
          cx="12"
          cy="12"
          r="10"
          stroke-width="2"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="progressOffset"
        />
      </svg>

      <span :class="{ 'text-red-500': isOverLimit }">
        <span v-if="!isOverLimit">{{ characterCount }} / {{ characterLimit }}</span>
        <span v-if="isOverLimit">{{ overLimitCount }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  characterLimit: {
    type: Number,
    default: 22,
  },
  placeholder: {
    default: "What's happening?"
  }
});

const emit = defineEmits(['update:modelValue', 'update:overLimit']);
const textareaRef = ref(null);
// const characterCount = computed(() => props.modelValue.length);
const characterCount = computed(() => (props.modelValue || '').length);
const isOverLimit = computed(() => characterCount.value > props.characterLimit);
const overLimitCount = computed(() => {
  // return isOverLimit.value ? `-${characterCount.value - props.characterLimit}` : '';
  return isOverLimit.value ? `-${characterCount.value - props.characterLimit}` : '';
});

const circumference = 2 * Math.PI * 10; 
const progress = computed(() => {
  const percentage = (characterCount.value / props.characterLimit) * 100;
  return Math.min(percentage, 100); 
});
const progressOffset = computed(() => {
  return circumference - (progress.value / 100) * circumference;
});

watch(isOverLimit, (newValue) => {
  emit('update:overLimit', newValue);
});

const handleInput = (event) => {
  console.log(event.target.value)
  emit('update:modelValue', event.target.value);
  resizeTextarea();
};

const resizeTextarea = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '20px';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      resizeTextarea();
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.progress-circle-fill {
  stroke: #1890ff; 
  transition: stroke-dashoffset 0.3s ease;
}

.over-limit ~ .progress-container .progress-circle-fill {
  stroke: #ff4d4f; 
}
</style>