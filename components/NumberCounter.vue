<template>
  <NumberFlow :format="{ notation: 'compact' }" :value="props.count" />
</template>

<script setup>
import NumberFlow from '@number-flow/vue'

const props = defineProps({
  count: {
    requred: true
  }
})
</script>