<script setup>
import { useToastState } from '~/composables/useToastState'

const { visible, message, color, actionLabel, triggerAction, hideToast } = useToastState()
</script>

<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    timeout="4000"
    location="bottom left"
    rounded="pill"
  >
    {{ message }}
    <template #actions>
      <v-btn
        v-if="actionLabel"
        size="small"
        variant="text"
        @click="triggerAction"
      >
        {{ actionLabel }}
      </v-btn>
    </template>
  </v-snackbar>
</template>
