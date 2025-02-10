<template>
  <div class="border-default rounded-lg">
    <!-- <div class="search sticky top-12 z-50"> -->
    <div class="search">
      <!-- <UCommandPalette :groups="groups" :autoselect="false" @update:model-value="actionCompletionItem"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }" /> -->
      <v-text-field 
        ref="searchInput"
        placeholder="Search..."
        v-model="searchQuery"
        @update:focused="updateFocus"
        @keydown="submitSearch"
        :focused="searchFocus"
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
          <div>
            <v-list 
              class="dark:bg-black dark:text-white"
              >
              <v-list-item
                v-for="(item) in items"
                :key="item.username"
                :prepend-avatar="item.avatar"
                :ripple="false"
                @click="clickUser(item)"
              >
                <template v-slot:title>
                  <div v-html="item.display_nmae"></div>
                </template>

                <template v-slot:subtitle>
                  <div v-html="item.username"></div>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </div>
      <div v-else>
        <Post :input-post="false" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { BeakerIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const searchQuery = ref('')
const searchFocus = ref(false)
const searchInput = ref(null)

const items = ref([
  {
    avatar: 'https://picsum.photos/250/300?image=660',
    display_nmae: 'Mark The Sucker',
    username: '@Mark',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=821',
    display_nmae: 'John The Brave',
    username: '@John',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=783',
    display_nmae: 'Bella The Explorer',
    username: '@Bella',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=1006',
    display_nmae: 'LaToya The Wise',
    username: '@LaToya',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=146',
    display_nmae: 'Nancy The Quick',
    username: '@Nancy',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=1008',
    display_nmae: 'Daniel The Strong',
    username: '@Daniel',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=839',
    display_nmae: 'Spike The Bold',
    username: '@Spike',
  },
  {
    avatar: 'https://picsum.photos/250/300?image=145',
    display_nmae: 'Emma The Kind',
    username: '@Emma',
  },
])

watch(searchQuery, (newQuery) => {
  console.log('User is typing:', newQuery)
  // You can add more logic here to handle the search query
})

const updateFocus = (focus) => {
  console.log(focus)
  searchFocus.value = focus
}

const submitSearch = (event) => {
  if(event.key === 'Enter') {
    console.log('enter')
    console.log(searchFocus.value)
    searchFocus.value = false
    searchInput.value.blur()
    console.log(searchFocus.value)
  }
}

const clickUser = (item) => {
  console.log("user: ", item)
}

</script>