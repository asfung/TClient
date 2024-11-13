// // import { useHead } from '@vueuse/head'
// import { useHead } from '#app'

// export default defineNuxtPlugin(() => {

//   watch(this.$colorMode.preference, (newMode) => {
//     const iconPath = newMode === 'dark'
//       ? '/images/TALKER_PART1_BLACK.png'
//       : '/images/TALKER_PART1_WHITE.png'

//     useHead({
//       link: [
//         { rel: 'icon', type: 'image/png', href: iconPath }
//       ]
//     })
//   })

//   const initialIconPath = this.$colorMode.preference === 'dark'
//     ? '/images/TALKER_PART1_BLACK.png'
//     : '/images/TALKER_PART1_WHITE.png'

//   useHead({
//     link: [
//       { rel: 'icon', type: 'image/png', href: initialIconPath }
//     ]
//   })
// })