<template>
    <div>
      <h1>Hello Resources</h1>
  
      <button @click="clickAcl" class="bg-red-500">Acl</button>
      <p>{{ $hasResource('resource-dashboard') }}</p>
      <pre>{{ resourceStore.resources }}</pre>
  
    </div>
  </template>
  
  <script setup>
  import { useResourceStore } from '~/stores/Resource';
  import { computed } from 'vue';
  
  const resourceStore = useResourceStore()
  
  const clickAcl = () => {
    resourceStore.getResources()
  
  }
  </script>