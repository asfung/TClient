<template>
  <!-- <div class="dark:border-white dark:border dark:rounded"> -->
  <!-- <div class="border-default rounded-lg"> -->
  <div class="" :class="{'border-default rounded-lg': inputPost}">
    <!-- <p>{{ inputPost }}</p> -->
    <div v-if="inputPost" class="flex">
      <div class="m-2 w-10 py-1">
        <img class="inline-block h-10 w-10 rounded-full"
          src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
      </div>
      <div class="flex-1 px-2 pt-2 mt-2">
        <textarea v-model="content" @input="handleInput" class="bg-transparent text-gray-400 font-medium text-lg w-full overflow-y-scroll scrollable"
          rows="2" cols="50" placeholder="What's happening?"></textarea>
        <div class="flex">
          <div class="w-10"></div>

          <div class="px-2">

            <div class="flex items-center">
              <div class="flex-1 text-center px-1 py-1 m-2">
                <a href="#"
                  class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                </a>
              </div>

            </div>
          </div>

          <div class="flex-1">
            <button
              @click="hellnah()"
              class="dark:bg-neutral-dark dark:hover:bg-primaryDark mt-5 hover:bg-blue-600 bg-neutral text-white dark:text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- after tweet -->
     <div v-if="inputPost">
      <!-- <hr class="border-gray-600 dark:border-white" /> -->
      <PostItem :item="postMe" />
     </div>
    

    <!-- data tweet -->
    <div v-for="(item, index) in posts" :key="index">
      <!-- <hr class="border-gray-600 dark:border-white" /> -->
      <PostItem :item="item" />
    </div>

    <div id="checkpoint-section"></div>
  </div>

</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/Auth'
import { usePostStore } from '~/stores/Post';
import PostContentText from '../PostContentText.vue';

// const pinia = createPinia()

// const posts = defineProps(['posts']);
const postStore = usePostStore()
const clicked = ref(false);
const props = defineProps({
  inputPost: {
    type: Boolean,
    required: false,
    default: true,
  },
});

// state
const posts = computed(() => postStore.posts);
const postHasNextPage = computed(() => postStore.hasNextPage);

const feeds = reactive(Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  username: `user ${i + 1}`,
  title: `selekences ${i + 1}`,
  subtitle: `selekencess cessss ${i + 1}`,
  description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${i + 1}`,
  show: false,
  liked: false,
})));

const isLoading = ref(false);
const hasNextPage = ref(true);
const maxCharsPerLine = ref(50);
const content = ref(`our project on https://github.com/asfung/TClient appreciate to @rama and @perdi for the contributing!, 

#Nuxt3 #Sigma`);
const contentData = ref("@Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie");


const postMe = ref({
  id: `1`,
  username: `me1`,
  title: `title me 1 `,
  subtitle: `substile me 1`,
  description: `description me 1`,
  contentData: content,
  show: false,
  liked: false,
  media: [
    'https://picsum.photos/600/800?random=1',
    'https://picsum.photos/600/800?random=2',
    'https://picsum.photos/600/800?random=3',
    'https://picsum.photos/600/800?random=4',
    'https://picsum.photos/600/800?random=5',
    'https://picsum.photos/600/800?random=6'
  ],
});

// watch content
watch(content, (newValue) => {
  console.log(newValue);
});

// methods
const loadMoreData = () => {
  isLoading.value = true;
  console.log("waiting for load new data");

  setTimeout(() => {
    const newData = Array.from({ length: 10 }, (_, i) => ({
      id: `${feeds.length + i + 1}`,
      username: `user ${i + 1}`,
      title: `selekences ${feeds.length + i + 1}`,
      subtitle: `selekencess cessss ${feeds.length + i + 1}`,
      description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${feeds.length + i + 1}`,
      show: false,
      liked: false,
    }));

    console.log(`before fetch: ${feeds.length}`);
    feeds.push(...newData);
    console.log(`after fetch: ${feeds.length}`);

    isLoading.value = false;
    hasNextPage.value = newData.length === 10;
    console.log(hasNextPage.value);
  }, 2000);
};

const parseContent = (content) => {
  const hashtagRegex = /#\w+/g;
  const linkRegex = /https?:\/\/[^\s]+/g;
  const mentionRegex = /@\w+/g;

  return content
    .replace(/\n/g, '<br>')
    .replace(linkRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`)
    .replace(hashtagRegex, (hashtag) => `<a href="/search?term=${hashtag.slice(1)}" class="text-blue-500 hover:underline">${hashtag}</a>`)
    .replace(mentionRegex, (mention) => `<a href="/@${mention.slice(1)}" class="text-blue-500 hover:underline">${mention}</a>`);


};

const handleInput = (event) => {
  const input = event.target.value;
  const lines = input.split('\n');
  const newLines = lines.map(line => {
    const chunks = [];
    for (let i = 0; i < line.length; i += maxCharsPerLine.value) {
      chunks.push(line.substring(i, i + maxCharsPerLine.value));
    }
    return chunks.join('\n');
  });

  content.value = newLines.join('\n');
};

const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postHasNextPage) {
        // loadMoreData();
        postStore.loadMoreData()
      }
    },
    { threshold: 1.0 }
  );
  
  observer.observe(sentinel);

  // PROBLEM REPORT 
  /*
  the first fetch is waited for 5 second annd after the second fetch is 1 second maybe not even 1 second 
  */

};


const hellnah = () => {
  clicked.value = true;
  if(clicked.value === true){
    const authStore = useAuthStore()
    authStore.setToken('this is token')
    console.log('Token set:', authStore.token)
    clicked.value = false;
  }

};

// const clickPostItem = (item) => {
//   console.log(item);
// };

onMounted(() => {
  observeSentinel();
});

// Image list
const items = [
  'https://picsum.photos/600/800?random=1',
  'https://picsum.photos/600/800?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
  'https://picsum.photos/600/800?random=6'
];

// Dynamic class for images
const imageClass = computed(() => {
  const itemCount = items.length;
  return itemCount <= 4 ? 'w-1/4' : itemCount <= 6 ? 'w-1/6' : 'w-1/8';
});

</script>
