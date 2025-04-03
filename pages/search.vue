<template>
  <div class="border-default rounded-lg">
    <div class="search">
      <v-text-field 
        ref="searchInput"
        placeholder="Search..."
        v-model="searchQuery"
        @focus="updateFocus(true)"
        @blur="updateFocus(false)"
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
                :prepend-avatar="$getImage(item.profile_image.key)"
                :ripple="false"
                @click.stop="clickUser(item)"
              >
                <template v-slot:title>
                  <div v-html="item.display_name"></div>
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

const searchQuery = ref('')
const searchFocus = ref(false)
const searchInput = ref(null)
const userStore = useUserStore()
const postStore = usePostStore()

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

watch(searchQuery, () => {
  userSearchFetch()
  postSearchFetch()
})

const updateFocus = (focus) => {
  searchFocus.value = focus
}

const submitSearch = () => {
  searchFocus.value = false
  searchInput.value.blur()
}

const clickUser = (item) => {
  console.log("Selected user:", item)
}
</script>
