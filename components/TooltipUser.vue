<template>
  <div v-if="isLoading" class="font-base text-white">
    <div 
      class="mx-auto shadow-lg ring-2 bg-primaryLight dark:bg-primaryDark rounded-2xl ring-primaryDark dark:ring-primaryLight shadow-primaryLight/50 dark:shadow-primaryDark/50">
      <!-- <v-card-item> -->
        <div class="p-5">
          <div class="">
            <div class="grid grid-cols-3">
              <div class="col-start-1 col-end-3">
                <div>
                  <img class="inline-block h-10 w-10 rounded-full"
                  :src="user.profile_image ? baseStorageUrl + user.profile_image.key : randomProfileImage(user.display_name)" alt="" />
                </div>
                <div class="">
                  <p :class="$chaosOrb(userProfile.username)">{{ userProfile.display_name }}</p>
                  <p class="text-neutral-dark dark:text-neutral">@{{ userProfile.username }}</p>
                </div>
              </div>
              <div class="col-span-1 col-end-9">
                <button 
                  v-if="$user.username !== userProfile.username"
                  @click="toggleFollowFetch"
                  class="bg-neutral dark:bg-neutral-dark font-bold py-2 px-4 rounded-full"
                  >
                  {{ userProfile.followed ? 'Followed' : 'Follow' }}
                </button>
              </div>
            </div>
          </div>
          <div class="max-w-64 breaks-word">{{ userProfile.bio?? 'No Bio Available'}}</div>
          <div class="flex justify-start space-x-2">
            <p class="text-primaryDark dark:text-primaryLight">
              <span class="font-base-bold">{{ $numberFormat(userProfile.followers_count) }}</span>
              Followers</p>
            <p class="text-primaryDark dark:text-primaryLight">
              <span class="font-base-bold">{{ $numberFormat(userProfile.following_count) }}</span>
              Following</p>
          </div>
        </div>
      <!-- </v-card-item> -->
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/User'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: []
  }
})

const userStore = useUserStore()
const isLoading = ref(false)
const userProfile = ref([])
const baseStorageUrl = computed(() => {
  const runtimeConfig = useRuntimeConfig()
  return runtimeConfig.public.storagelUrl
})


const getUserProfile = async () => {
  try{
    isLoading.value = false
    const { data, status } = await userStore.userProfile(props.user.username)
    userProfile.value = data
  }catch(e){console.log(e)}
  finally{
    isLoading.value = true
  }
}

const toggleFollowFetch = async () => {
  const fetch = await userStore.toggleFollow({
    user_id_followed: userProfile.value.id
  })
  userProfile.value.followed = fetch.state
}

const randomProfileImage = (display_name) => {
  const formattedName = display_name.replace(/\s+/g, "+"); 
  return `https://eu.ui-avatars.com/api/?background=random&name=${formattedName}`;
}

onMounted(() => {
  getUserProfile()
})

</script>
