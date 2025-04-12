<template>
  <div>
  <div 
    v-if="!isDeleted"
    @click="clickPostItem" 
    @mousedown="startSelection"
    @mouseup="endSelection"
    class="cursor-pointer hover:bg-gray-300 hover:bg-opacity-15 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
    >
    <hr v-if="props.index !== 0" class="border-gray-400 dark:border-white" />

    <!-- <div class="flex flex-shrink-0 p-4 pb-0"> -->
    <div class="flex p-4 pb-0 justify-between items-start">
      <a class="flex-shrink-0 group block">
        <div class="flex items-center">
          <div>
            <TooltipCard>
              <template v-slot:body>
                <img v-bind="props" class="inline-block h-10 w-10 rounded-full" @click.stop="$redirectProfile(item.user)"
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
                      @{{ item.user.username }} . {{ $convertToRelativeTime(item.created_at) }} </span>
                  </NuxtLink>
                  <!-- {{ item.__typename }} -->
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

      <v-menu 
        v-model="menuDot"
        v-if="$user?.id === props.item?.user?.id"
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
    </div>

    <div class="">
      <!-- <div class=""> -->
        <PostContentText 
          class="pl-[70px] max-w-[475px]" 
          :content="item.content?? ''" 
        />
      <!-- </div> -->

      <div class="pl-0" @click.stop>
        <UCarousel v-slot="{ item, index }" :items="item.media" @click.stop
          :ui="{ item: 'mx-1', container: 'pl-16 pr-5 snap-none scroll-smooth flex items-center' }">
          <img v-if="item.mimetypes.startsWith('image/')" :src="$getImage(item.key)" width="300" draggable="true" @click.stop="previewMedia(props.item.media, index)"
            class="rounded-lg cursor-pointer duration-200 active:scale-95" />
          <video v-else-if="item.mimetypes === 'video/mp4'" :src="$getImage(item.key)" class="w-full h-64 object-cover rounded"
            controls @click.stop="previewMedia(props.item.media, index)" />
        </UCarousel>
      </div>

      <!-- post item cant hold this ass thing -->
      <div class="px-[70px]" v-if="item.__typename === 'quote'">
        <QuoteItem :quote="item.quote" />
      </div>

      <!-- ACTIONS -->
      <div class="flex pl-16">
        <ActionPostLike @click.stop :liked="item.liked" :post_id="item.id" :count="item.like_count" @update-like="handleUpdateLike" />
        <ActionPostReply @click.stop :parent_id="item.id" :count="item.reply_count" />
        <ActionPostRepost @click.stop :count="item.repost_count" :post_id="item.id" :reposted="item.reposted" @update-repost="handleUpdateRepost" />
        <ActionPostBookmark @click.stop :bookmarked="item.bookmarked" :post_id="item.id" @update-bookmark="handleUpdateBookmark" />
        <ActionPostShared @click.stop :item="item" />
      </div>

    </div>

  </div>
    <div 
      v-if="isDeleted"
      class="p-4 text-gray-500 dark:text-gray-400 border-t border-gray-400 dark:border-white"
      >
      <p>This post has been deleted</p>
    </div>

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
import { usePostStore } from '~/stores/Post'
import { useEditPost } from '~/composables/useEditPost'
import { useDeletePost } from '~/composables/useDeletePost'
import { useEditPostField } from '~/composables/useEditPostField'

const postStore = usePostStore()
const { editPost } = useEditPost()
const { deletePost } = useDeletePost()
const { editPostField } = useEditPostField()
const { $listen, $hashSha256, $user } = useNuxtApp()

const isDeleted = ref(false)
const isSelectingText = ref(false);
const menuDot = ref(false)
const postEditDialog = ref(false)

// delete dialog 
const isSubmitting = ref(false)
const showDeleteConfirm = ref(false)

// media preview
const showMediaPreview = ref(false)
const selectedMedia = ref([])
const selectedStartIndex = ref(0)


const props = defineProps({
  item: {
    required: true
  },
  index: {
    required: false
  },
})

const emit = defineEmits(['post-updated', 'post-deleted'])

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
  // props.item.reposted = payload.reposted
  // props.item.repost_count = payload.count
  editPostField(props.item.id, "reposted", payload.reposted)
  editPostField(props.item.id, "repost_count", payload.count)
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
      isDeleted.value = true
      deletePost(props.item.id);
      emit('post-deleted', true)
    }
  } finally {
    isSubmitting.value = false
  }
}

// gesture
const closeReplyDialog = () => {
  postEditDialog.value = false
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

// ini buat tipe post 'quote', 'reply' but gk guna deh 
const handleTypePost = () => {
}

const clickPostItem = () => {
  if (!isSelectingText.value) {
    useNuxtApp().$router.push(`/@${props.item.user.username}/talk/${props.item.id}`);
  }
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
</script>