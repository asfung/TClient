<template>
    <div>
        {{ posts }}
    </div>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { usePostStore } from '~/stores/Post';
import { useAuthStore } from '~/stores/Auth';

const postStore = usePostStore();
const authStore = useAuthStore();   

const posts = computed(() => postStore.posts);
const postsSecond = computed(() => postStore.post);
const token = computed(() => authStore.token);
// const postsLength = computed(() => posts.value.length);

onMounted(() => {
    console.log('jumalh pada page name : ', posts.value.length)
    console.log('jumalh pada page name : ', postsSecond.value.length)
    console.log('token : ', authStore.getToken())
});
</script>
