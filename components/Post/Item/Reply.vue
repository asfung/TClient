<template>
  <div class="">
    <!-- FKKKK THIS SHIT PAL -->
    <div :class="{ 'max-w-[300px]' : $isBreakpoint(['xs','sm']), 'max-w-[200px]' : $isBreakpoint(['lg']) }">
      <p class="text-base leading-6 font-medium flex items-start justify-between" v-if="item.user">
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


        <v-menu 
          v-model="menuDot"
          v-if="$user.id === props.item.user.id"
          location="bottom end"
          @click.stop="handleMoreOptions"
          scroll-strategy="close" 
          >
          <!-- :close-on-content-click="false" -->
          <template v-slot:activator="{ props }">
            <button 
              v-bind="props"
              class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0 transition-transform duration-200 ease-in-out active:scale-90"
            >
              <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </template>
          
          <div class="mx-auto shadow-lg bg-gray-100 dark:bg-black rounded-2xl ring-1 ring-primaryDark dark:ring-primaryLight shadow-primaryLight/50 dark:shadow-primaryDark/50">
            <ul class="p-3 font-base-bold">
              <li 
                @click.stop="postEditDialog = !postEditDialog"
                class="flex items-center hover:bg-gray-300 dark:hover:bg-opacity-10 rounded-lg hover:cursor-pointer">
                <div class="flex-1 p-2">
                  <p>Edit</p>
                </div>
                <div class="p-2">
                  <v-icon class="ml-12">
                    mdi-pencil-outline
                  </v-icon>
                </div>
              </li>
              <li 
                @click.stop="showDeleteConfirm = !showDeleteConfirm"
                class="flex items-center text-red-600 hover:bg-gray-300 dark:hover:bg-opacity-10 rounded-lg hover:cursor-pointer">
                <div class="flex-1 p-2">
                  <p>Delete</p>
                </div>
                <div class="p-2">
                  <v-icon class="ml-12">mdi-trash-can-outline</v-icon>
                </div>
              </li>
            </ul>
          </div>
        </v-menu>
      </p>


      <PostContentText class="max-w-[475px] break-words" :content="item.content ?? ''" />

      <div class="pl-0 mb-2" @click.stop>
        <UCarousel v-slot="{ item, index }" :items="item.media" @click.stop
          :ui="{ item: 'mx-1', container: 'pr-5 snap-none scroll-smooth flex items-center' }">
          <img v-if="item.mimetypes?.startsWith('image/')" :src="$getImage(item.key)" width="300" draggable="true"
            @click.stop="previewMedia(props.item.media, index)" class="rounded-lg cursor-pointer duration-200 active:scale-95" />
          <video v-else-if="item.mimetypes === 'video/mp4'" :src="$getImage(item.key)"
            class="w-full h-52 object-cover rounded" controls @click.stop="previewMedia(props.item.media, index)" />
        </UCarousel>
      </div>

      <div class="mr-10" v-if="item.__typename === 'quote' && props.showQuote">
         <QuoteItem :quote="item.quote" />
      </div>

      <div class="flex">
        <ActionPostLike @click.stop :liked="item.liked" :post_id="item.id" :count="item.like_count" @update-like="handleUpdateLike" />
        <ActionPostReply @click.stop :parent_id="item.id" :count="item.reply_count" />
        <ActionPostRepost @click.stop :count="item.repost_count" :post_id="item.id" :reposted="item.reposted" @update-repost="handleUpdateRepost" />
        <ActionPostBookmark @click.stop :bookmarked="item.bookmarked" :post_id="item.id" @update-bookmark="handleUpdateBookmark" />
        <ActionPostShared @click.stop :item="item" />
      </div>
    </div>
    <!-- </li>
      </ol>



    </div> -->
    <!-- <PostItemReply :item="item" /> -->
    <DialogTextArea :dialog="postEditDialog" @close-dialog="closeReplyDialog" :post-to-edit="props.item" @post-updated="handlePostUpdated" />
    <DashboardDeleteConfirmation
      v-model="showDeleteConfirm"
      :name="`${props.item.user.username} Post`"
      :loading="isSubmitting"
      @confirm="handlePostDelete"
    />
    <MediaPreview
      v-model="showMediaPreview"
      :media="selectedMedia"
      :startIndex="selectedStartIndex"
    />
  </div>
</template>

<script setup>
import { useEditPost } from '~/composables/useEditPost'
import { useDeletePost } from '~/composables/useDeletePost'
import { usePostStore } from '~/stores/Post'

const postStore = usePostStore()
const { editPost } = useEditPost()
const { deletePost } = useDeletePost()
const { $listen, $hashSha256, $user } = useNuxtApp()

// delete dialog
const isSubmitting = ref(false)
const showDeleteConfirm = ref(false)

// media preview
const showMediaPreview = ref(false)
const selectedMedia = ref([])
const selectedStartIndex = ref(0)

const menuDot = ref(false)
const postEditDialog = ref(false)
const isSelectingText = ref(false);
const props = defineProps({
  item: {
    required: true
  },
  showQuote: {
    required: false,
    default: true,
  }
})

const emit = defineEmits(['post-updated']) // unused

onMounted(() => {
  postSocketListen()
})

const channelName = '_watcherpost.' + props.item?.id
const channelNameHashed = $hashSha256(channelName)
const event = 'WatcherPostEvent'

const postSocketListen = () => {
  $listen(channelNameHashed, event, (data) => {
    console.log(data)
    props.item.like_count = data.like_count
    props.item.reply_count = data.reply_count
    props.item.repost_count = data.repost_count
  })
}

const handleUpdateLike = (payload) => {
  props.item.liked = payload.liked
  props.item.like_count = payload.count
}

const handleUpdateRepost = (payload) => {
  props.item.reposted = payload.reposted
  props.item.repost_count = payload.count
}

const handleUpdateBookmark = (payload) => {
  props.item.bookmarked = payload.bookmarked
}

const handlePostUpdated = (updatedPost) => {
  editPost(props.item.id, updatedPost)
}

const handlePostDelete = async () => {
  isSubmitting.value = true
  try {
    const fetch = await postStore.deletePost({
      post_id: props.item.id,
    })
    if(fetch.state === true){
      showDeleteConfirm.value = false
      deletePost(props.item.id);
    }
  } finally {
    isSubmitting.value = false
  }
}

const closeReplyDialog = () => {
  postEditDialog.value = false
}

const handleMoreOptions = () => {
  menuDot.value = !menuDot.value
  console.log('item post ', props.item.id)
}

const previewMedia = (media, index = 0) => {
  selectedMedia.value = media
  selectedStartIndex.value = index
  showMediaPreview.value = true
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