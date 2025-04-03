<template>
  <div class="border-default rounded-lg">
    <div class="search">
      <v-text-field 
        ref="searchInput"
        placeholder="Search..."
        v-model="searchQuery"
        @focus="updateFocus(true)"
        @blur="handleBlur"
        @keydown.enter="submitSearch"
        variant="outlined">
        <template #prepend-inner>
          <MagnifyingGlassIcon class="size-5" />
        </template>
      </v-text-field>
    </div>

    <div class="result-post">
      <div v-if="searchFocus">
        <div class="mx-4 my-2 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <BeakerIcon class="size-5" />
              <span class="ml-2 text-sm font-semibold">Search for "{{ searchQuery }}"</span>
            </div>
          </div>
          <v-divider></v-divider>

          <div v-if="userSearch.length">
            <p class="font-bold">Users</p>
            <v-list class="dark:bg-black dark:text-white">
              <v-list-item
                v-for="item in userSearch"
                :key="item.username"
                :prepend-avatar="item.profile_image ? $getImage(item.profile_image?.key) : $randomProfileImage(item.display_name)"
                :ripple="false"
                @mousedown.prevent
                @click="clickUser(item)"
              >
                <template v-slot:title>
                  <div :class="$chaosOrb(item.username)" v-html="item.display_name"></div>
                </template>
                <template v-slot:subtitle>
                  <div v-html="item.username"></div>
                </template>
              </v-list-item>
            </v-list>
          </div>

          <div v-if="postsSearch.length">
            <p class="font-bold mt-4">Posts</p>
            <div v-for="(item, index) in postsSearch" :key="index">
              <PostItem :item="item" :index="index" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, index) in postsSearch" :key="index">
          <PostItem :item="item" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BeakerIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { usePostStore } from '~/stores/Post'
import { useUserStore } from '~/stores/User'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'

const searchQuery = ref('')
const searchFocus = ref(false)
const searchInput = ref(null)
const userStore = useUserStore()
const postStore = usePostStore()
const route = useRoute()
const router = useRouter()

const { userSearch } = storeToRefs(userStore)
const { postsSearch } = storeToRefs(postStore)

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const userSearchFetch = debounce(async () => {
  if (searchQuery.value.trim()) {
    const fetch = await userStore.searchUser({ 
      q: searchQuery.value 
    })
    userStore.userSearch = fetch.status === 200 ? fetch.data : []
  } else {
    userStore.userSearch = []
  }
}, 300)

const postSearchFetch = debounce(async () => {
  if (searchQuery.value.trim()) {
    const fetch = await postStore.getPost({ 
      q: searchQuery.value, 
      page: 1, 
      per_page: 10 
    })
    postStore.postsSearch = fetch.status === 200 ? fetch.data : []
  } else {
    postStore.postsSearch = []
  }
}, 300)

watch(searchQuery, (newQuery) => {
  userSearchFetch()
  postSearchFetch()
  if (newQuery.trim()) {
    router.push({ query: { q: newQuery } })
  } else {
    router.push({ query: {} })
  }
})

const updateFocus = (focus) => {
  searchFocus.value = focus
}

const handleBlur = (event) => {
  const relatedTarget = event.relatedTarget || document.activeElement
  if (relatedTarget && relatedTarget.closest('.result-post')) {
    searchFocus.value = true
  } else {
    searchFocus.value = false
  }
}

const submitSearch = () => {
  searchFocus.value = false
  searchInput.value.blur()
}

const clickUser = (item) => {
  console.log("Selected user:", item)
  searchFocus.value = true
}

onMounted(() => {
  const query = route.query.q
  if (query) {
    searchQuery.value = query
    searchFocus.value = true 
    userSearchFetch()
    postSearchFetch()
  }
})
</script>