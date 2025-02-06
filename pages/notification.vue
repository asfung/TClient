<template>
    <div class="border-default rounded-lg">
        <div v-for="(item, index) in 1000" :key="index">
            <p>notification</p>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    scrollToTop: false,
})

onMounted(() => {
    window.scrollTo(0, 2000)
})
</script>