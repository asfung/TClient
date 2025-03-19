<template>
  <div>
    <p>{{ role }}</p>
    <!-- <pre>{{ resourceStore.resourcesResource }}</pre>
    <pre>{{ resourceStore.resourcesPermission }}</pre> -->
  </div>
</template>

<script setup>
import { useResourceStore } from '~/stores/Resource'

const route = useRoute()
const { decryptURI } = useCryptoLocalStorage()
const resourceStore = useResourceStore()
const role = decryptURI(route.params.role)

onMounted(() => {
  resourceStore.getResourcesResources({
    roleId: role.id,
    mode: 'all'
  })
})


</script>