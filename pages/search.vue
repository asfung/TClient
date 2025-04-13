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

    <div v-if="$isBreakpoint(['xs', 'sm']) && !searchFocus && !searchQuery" class="h-screen">
      <NuxtLink
        v-for="(trend, index) in hashtags"
        :key="index"
        :to="`/search?q=${trend.tag_name}`"
        >
        <v-chip class="m-2 text-primaryLight dark:text-primaryDark" variant="outlined" link>
          <p class="font-semibold">{{ trend.tag_name }}</p>
        </v-chip>
      </NuxtLink>
    </div>

    <div class="result-post">
      <div v-if="searchFocus">
        <!-- <div class="mx-4 my-2 space-y-4"> -->
        <div class="my-2 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center ml-3">
              <BeakerIcon class="size-5" />
              <span class="ml-2 text-sm font-semibold">Search for "{{ searchQuery }}"</span>
            </div>
          </div>
          <v-divider></v-divider>

          <div v-if="userSearch.length">
            <p class="font-bold ml-3">Users</p>
            <v-list class="dark:bg-black dark:text-white">
              <v-list-item
                v-for="item in userSearch"
                :key="item.username"
                :prepend-avatar="item.profile_image ? $getImage(item.profile_image?.key) : $randomProfileImage(item.display_name)"
                :ripple="false"
                @mousedown.prevent
                @click="clickUser(item)"
                height="60"
                >
                <template v-slot:title>
                  <div :class="$chaosOrb(item.username)" v-html="item.display_name"></div>
                </template>
                <template v-slot:subtitle>
                  <div v-html="item.username"></div>
                </template>
                <template v-slot:append>
                  <button 
                    @click.stop="toggleFollowFetch(item)"
                    :class="item?.followed ? 'ring-1 ring-primaryLight dark:ring-primaryDark dark:text-white' : ' bg-primaryLight dark:bg-primaryDark text-white'"
                    class="font-bold py-2 px-4 rounded-full">
                    {{ item?.followed ? 'Followed' : 'Follow' }}
                  </button>
                </template>
              </v-list-item>
            </v-list>
          </div>

          <div v-if="postsSearch.length">
            <p class="font-bold mt-4 ml-3">Posts</p>
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

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { BeakerIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { usePostStore } from '~/stores/Post'
import { useUserStore } from '~/stores/User'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useTagStore } from '~/stores/Tag'

const { $isBreakpoint } = useNuxtApp()
const tagStore = useTagStore()
const searchQuery = ref('')
const searchFocus = ref(false)
const searchInput = ref(null)
const userStore = useUserStore()
const postStore = usePostStore()
const route = useRoute()
const router = useRouter()

const { userSearch } = storeToRefs(userStore)
const { postsSearch, postsSearchPage, postsSearchHasNextPage } = storeToRefs(postStore)
const { hashtags } = storeToRefs(tagStore)

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

const postSearchFetch = debounce(async (page) => {
  if (searchQuery.value.trim()) {
    const fetch = await postStore.getPost({ 
      q: searchQuery.value, 
      page: page,
    })

    if (fetch.status === 200) {
      const newPosts = fetch.data

      if (page === 1) {
        postStore.postsSearch = newPosts
      } else {
        postStore.postsSearch.push(...newPosts)
      }

      postStore.postsSearchPage = page
      postStore.postsSearchHasNextPage = newPosts.length > 0

      if (page === 1) {
        nextTick(() => observeSentinel())
      }
    } else {
      postStore.postsSearchHasNextPage = false
    }
  } else {
    postStore.postsSearch = []
    postStore.postsSearchHasNextPage = false
  }
}, 300)

const toggleFollowFetch = async (user) => {
  const fetch = await userStore.toggleFollow({
    user_id_followed: user.id
  })

  user.followed = fetch.state

  if (fetch.state) {
    user.followers_count = (user.followers_count || 0) + 1
  } else {
    user.followers_count = (user.followers_count || 1) - 1
  }
}

watch(searchQuery, (newQuery) => {
  // userSearchFetch()
  // postSearchFetch()
  // if (newQuery.trim()) {
  //   router.push({ query: { q: newQuery } })
  // } else {
  //   router.push({ query: {} })
  // }
  if (newQuery.trim()) {
    userSearchFetch()
    postStore.postsSearch = [] 
    postStore.postsSearchPage = 1 
    postStore.postsSearchHasNextPage = true 
    postSearchFetch(1)
    router.push({ query: { q: newQuery } })
  } else {
    userStore.userSearch = []
    postStore.postsSearch = []
    postStore.postsSearchPage = 1
    postStore.postsSearchHasNextPage = true
    router.push({ query: {} })
  }
})

watch(() => route.query.q, (newQuery) => {
  if (newQuery && typeof newQuery === 'string') {
    searchQuery.value = newQuery
    searchFocus.value = true
    userSearchFetch()
    postSearchFetch(1)
  } else {
    searchQuery.value = ''
    searchFocus.value = false
    userStore.userSearch = []
    postStore.postsSearch = []
    postStore.postsSearchPage = 1
    postStore.postsSearchHasNextPage = true
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
  console.log("selected user:", item)
  useNuxtApp().$router.push(`/@${item.username}`)
  searchFocus.value = true
}

const observeSentinel = () => {
  if(searchQuery.value.length < 0) return;
  if(postsSearchHasNextPage.value === false) return;
  const sentinel = document.getElementById("checkpoint-section")
  if (!sentinel) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postsSearchHasNextPage.value) {
        const nextPage = postsSearchPage.value + 1
        postSearchFetch(nextPage)
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel)
};

onMounted(() => {
  const query = route.query.q
  if (query) {
    searchQuery.value = query
    searchFocus.value = true 
    userSearchFetch()
    postSearchFetch(1)
    // observeSentinel()
  }
})
</script>