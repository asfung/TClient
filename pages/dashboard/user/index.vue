<template>
  <div class="flex w-full">
    <DashboardUserAdminTable />

    <!-- <button @click="clickAcl" class="bg-red-500">Acl</button>
    <p>{{ resourceStore.resourcesPermission }}</p> -->

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