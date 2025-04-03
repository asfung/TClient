<template>
  <div 
    @click="clickPostItem" 
    @mousedown="startSelection"
    @mouseup="endSelection"
    class="cursor-pointer hover:bg-gray-400 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
    >
    <hr v-if="props.index !== 0" class="border-gray-400 dark:border-white" />

    <!-- <div class="flex flex-shrink-0 p-4 pb-0"> -->
    <div class="flex p-4 pb-0 justify-between items-start">
      <a class="flex-shrink-0 group block">
        <div class="flex items-center">
          <div>
            <TooltipCard>
              <template v-slot:body>
                <img v-bind="props" class="inline-block h-10 w-10 rounded-full"
                  :src="item.user.profile_image ? $getImage(item.user.profile_image.key) : $randomProfileImage(item.user.display_name)" alt="" />
              </template>
              <template v-slot:tooltip>
                <div class="mt-2">
                  <TooltipUser :user="item.user" />
                </div>
              </template>
            </TooltipCard>
          </div>
        <TooltipCard>
          <template v-slot:body>
            <div class="ml-3">
                <p class="text-base leading-6 font-medium ">
                  <NuxtLink @click.stop v-if="item.reply" :to="`/@${item.reply.user.username}/talk/${item.reply.id}`"><p class="text-primaryLight dark:text-primaryDark hover:underline">{{ item.__typename === 'reply' ? `Replying @${item.reply.user.username}` : '' }}</p></NuxtLink>
                  <NuxtLink 
                    :to="`/@${item.user.username}`"
                    @click.stop
                    >
                    <span :class="$chaosOrb(item.user.username)" class="hover:underline">{{ item.user.display_name }}</span>
                    <span
                      class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 breaks-word block">
                      @{{ item.user.username }} . {{ convertToRelativeTime(item.created_at) }} </span>
                  </NuxtLink>
                </p>
              </div>
          </template>
          <template v-slot:tooltip>
            <div>
              <TooltipUser :user="item.user" />
            </div>
          </template>
        </TooltipCard>
        </div>
      </a>

      <button 
        v-if="$user.id === props.item.user.id"
        @click.stop="handleMoreOptions"
        class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
      >
        <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>

    <div class="">
      <!-- <div class=""> -->
        <PostContentText 
          class="pl-[70px] max-w-[475px]" 
          :content="item.content?? ''" 
        />
      <!-- </div> -->

      <div class="pl-0" @click.stop>
        <UCarousel v-slot="{ item }" :items="item.media" @click.stop
          :ui="{ item: 'mx-1', container: 'pl-16 pr-5 snap-none scroll-smooth flex items-center' }">
          <!-- <img :src="item" width="200" height="300" draggable="true" @click.stop -->
          <img v-if="item.mimetypes.startsWith('image/')" :src="$getImage(item.key)" width="300" draggable="true" @click.stop
            class="rounded-lg cursor-pointer duration-200 active:scale-95" />
          <video v-else-if="item.mimetypes === 'video/mp4'" :src="$getImage(item.key)" class="w-full h-52 object-cover rounded"
            controls @click.stop />
        </UCarousel>
      </div>

      <!-- ACTIONS -->
      <div class="flex pl-16">
        <ActionPostLike @click.stop :liked="item.liked" :post_id="item.id" :count="item.like_count" @update-like="handleUpdateLike" />
        <ActionPostReply @click.stop :count="item.reply_count" />
        <ActionPostRepost @click.stop :count="item.repost_count" />
        <ActionPostBookmark @click.stop :bookmarked="item.bookmarked" :post_id="item.id" @update-bookmark="handleUpdateBookmark" />
        <ActionPostShared @click.stop />
      </div>

    </div>
</div>
</template>


<script setup>
const isBookmarked = ref(false)
const isLiked = ref(false)
const isSelectingText = ref(false);

const props = defineProps({
  item: {
    required: true
  },
  index: {
    required: false
  },
})
const emit = defineEmits()

const handleUpdateLike = (payload) => {
  props.item.liked = payload.liked
  props.item.like_count = payload.count
}

const handleUpdateBookmark = (payload) => {
  props.item.bookmarked = payload.bookmarked
}

const startSelection = () => {
  isSelectingText.value = false;
};

const endSelection = () => {
  const selection = window.getSelection().toString();
  if (selection.length > 0) {
    isSelectingText.value = true;
  }
};

const handleTypePost = () => {
}

const convertToRelativeTime = (createdAt) => {
  return useNuxtApp().$dayjs.utc(createdAt)
    .tz('Asia/Jakarta')   
    .fromNow();
};

const clickPostItem = () => {
  if (!isSelectingText.value) {
    useNuxtApp().$router.push(`/@${props.item.user.username}/talk/${props.item.id}`);
  }
}

const handleMoreOptions = () => {
  console.log('item post ', props.item.id)
}
</script>