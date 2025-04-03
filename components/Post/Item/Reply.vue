<template>
  <div class="">
    <div class="">
      <p class="text-base leading-6 font-medium" v-if="item.user">
        <NuxtLink :to="`/@${item.user.username}`" @click.stop>
          <TooltipCard v-if="item.user">
            <template v-slot:body>
              <span :class="$chaosOrb(item.user.username)" class="hover:underline">
                {{ item.user.display_name }} 
              </span>
              <span
                class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 breaks-word block">
                @{{ item.user.username }} · {{ convertToRelativeTime(item.created_at) }}
              </span>
            </template>
            <template v-slot:tooltip>
              <div class="">
                <TooltipUser :user="item.user" />
              </div>
            </template>
          </TooltipCard>
        </NuxtLink>
      </p>


      <PostContentText class="max-w-[475px] break-words" :content="item.content ?? ''" />

      <div class="pl-0 mb-2">
        <UCarousel v-slot="{ item }" :items="item.media" @click.stop
          :ui="{ item: 'mx-1', container: 'pr-5 snap-none scroll-smooth flex items-center' }">
          <img v-if="item.mimetypes?.startsWith('image/')" :src="$getImage(item.key)" width="300" draggable="true"
            @click.stop class="rounded-lg cursor-pointer duration-200 active:scale-95" />
          <video v-else-if="item.mimetypes === 'video/mp4'" :src="$getImage(item.key)"
            class="w-full h-52 object-cover rounded" controls @click.stop />
        </UCarousel>
      </div>


      <div class="flex">
        <ActionPostLike @click.stop :liked="item.liked" :post_id="item.id" :count="item.like_count" @update-like="handleUpdateLike" />
        <ActionPostReply @click.stop :count="item.reply_count" />
        <ActionPostRepost @click.stop :count="item.repost_count" />
        <ActionPostBookmark @click.stop :bookmarked="item.bookmarked" :post_id="item.id" @update-bookmark="handleUpdateBookmark" />
        <ActionPostShared @click.stop />
      </div>
    </div>
    <!-- </li>
      </ol>



    </div> -->
    <!-- <PostItemReply :item="item" /> -->

  </div>
</template>

<script setup>

const isSelectingText = ref(false);
const props = defineProps({
  item: {
    required: true
  },
})

const handleUpdateLike = (payload) => {
  props.item.liked = payload.liked
  props.item.like_count = payload.count
}

const handleUpdateBookmark = (payload) => {
  props.item.bookmarked = payload.bookmarked
}

const convertToRelativeTime = (createdAt) => {
  return useNuxtApp().$dayjs.utc(createdAt)
    .tz('Asia/Jakarta')
    .fromNow();
};

onMounted(() => {
  // console.log(props.item)
  // console.log(useRoute().path)
})


</script>