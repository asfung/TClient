<template>
  <div class="border-default rounded-lg">
    <!-- {{ posts }} -->
    <div class="user-info">
      <div class="flex justify-between items-center p-4">
        <div>
          <p class="font-bold">Mark Sucker</p>
          <p class="text-neutral">@Mark</p>
        </div>
        <div class="top-8">
          <img src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" class="rounded-full"
            alt="Bonnie image" />
        </div>
      </div>
      <div class="p-4 max-w-96">
        <p class="break-words">get up the phone and touch grass</p>
        <div class="flex space-between mt-4 space-x-5">
          <p>
            2121
            <span class="text-neutral">Followers</span>
          </p>
          <p>
            78
            <span class="text-neutral">Following</span>
          </p>
          <p>
            3
            <span class="text-neutral">Posts</span>
          </p>
        </div>
      </div>
    </div>

    <div class="tab">
      <v-tabs v-model="tab" color="primary">
        <v-tab value="Posts" :ripple="false">Posts</v-tab>
        <v-tab value="Replies" :ripple="false">Replies</v-tab>
        <v-tab value="Likes" :ripple="false">Likes</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="Posts" :transition="false" :reverse-transition="false">
          <Post :input-post="false" />
        </v-tabs-window-item>

        <v-tabs-window-item value="Replies" :transition="false" :reverse-transition="false">
          <div v-for="(item, index) in postsReply" :key="index">
            <div class="flex flex-shrink-0 p-8 pb-0">
              <ol class="relative border-timeline" :class="{ 'border-none': postsReply.length === index + 1 }">
                <li class="ms-8 -mt-6">
                  <PostItemReply :item="item" />
                </li>
              </ol>
            </div>
          </div>
        </v-tabs-window-item>

        <v-tabs-window-item value="Likes" :transition="false" :reverse-transition="false">
          Three
        </v-tabs-window-item>
      </v-tabs-window>

    </div>

  </div>
</template>


<script setup>
definePageMeta({
  // middleware: ['auth-middleware'],
})
import { computed, onMounted } from 'vue';
import { usePostStore } from '~/stores/Post';
import { useAuthStore } from '~/stores/Auth';

const postStore = usePostStore();
const authStore = useAuthStore();
const tab = ref(null)
const items = ['Posts', 'Replies', 'Likes']

const posts = computed(() => postStore.posts);
const postsSecond = computed(() => postStore.post);
const token = computed(() => authStore.token);
const postsReply = computed(() => postStore.postsReply);
// const postsLength = computed(() => posts.value.length);

onMounted(() => {
  // console.log('jumalh pada page name : ', posts.value.length)
  // console.log('jumalh pada page name : ', postsSecond.value.length)
  // console.log('token : ', authStore.getToken())
});
</script>

<!-- <style scoped>
.bordered-tabs ::v-deep .v-slide-group__content {
  border-bottom: 3px solid #0000001e;
}

.v-slide-group__content {
  border-bottom: 8px solid #0000001e;
}

</style> -->
