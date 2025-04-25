// GLOBAL FUNCTIONS 
import { Utils } from "~/enums/Utils"
import CryptoJS from 'crypto-js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    console.log('Global Functions PLugin ✅')
  })

  // Var List
  const { getItem } = useCryptoLocalStorage()
  const baseStorageUrl = computed(() => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.storagelUrl
  })
  const SECRET_KEY = Utils.SECRET_KEY_CRYPTO
  const encryptionKey = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256("__n0t1f1c4t10n").toString(CryptoJS.enc.Hex).slice(0, 32));
  const iv = CryptoJS.enc.Utf8.parse('1223334444555556'); 
  const user = getItem('credentials')

  // Func List
  const randomProfileImage = (display_name) => {
    const formattedName = display_name.replace(/\s+/g, "+");
    return `https://eu.ui-avatars.com/api/?background=random&name=${formattedName}`;
  }
  const getImage = (key) => {
    const url = baseStorageUrl.value + key
    return url
  }

  const formatNumberWithK = (num) => {
    if (num < 1000) return num.toString();
    const formatted = (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1);
    return `${formatted.replace('.0', '')}k`;
  };

  const numberFormat = (number) => {
    // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return `${formatter.format(number)}`
  }

  const chaosOrbFor = (...usernames) => {
    // const highlightedUsers = new Set(usernames);
    const highlightedUsers = new Set(usernames.map((username) => username.toLowerCase()));
  
    return (username) => 
      // highlightedUsers.has(username)
      highlightedUsers.has(username?.toLowerCase())
        ? 'animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent' 
        : '';
  };

  const chaosOrb = (username) => {
    const highlightedUsers = ['paung', 'ilham'].map(u => u.toLowerCase());
    return highlightedUsers.includes(username?.toLowerCase())
      ? 'animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-base-bold' // sementara bold
      : '';
  } 

  const hashSha256 = (data) => {
    return CryptoJS.SHA256(data).toString()
  }

  const convertToRelativeTime = (createdAt) => {
    return useNuxtApp().$dayjs.utc(createdAt)
      .tz('Asia/Jakarta')   
      .fromNow();
  };

  const redirectProfile =  (user) => {
    useNuxtApp().$router.push(`/@${user.username}`)
  }

  const share = async ({ title, text, url }) => {
    try{
      const shareData = {
        title: title,
        text: text,
        url: url
      }
      await navigator.share(shareData)
    }catch(e){
      console.log(e)
    }
  }

  const copyText =  async (text) => {
    try{
      await navigator.clipboard.writeText(text)
      return text
    }catch(e){
      console.log(e)
      return false
    }
  }

  const shareLink = async ({ title, text, url }) => {
    try{
      const shareData = {
        title: title,
        text: text,
        url: url
      }
      await share(shareData)
      await copyText(shareData.url)
      return shareData.url
    }catch(e){
      console.log(e)
    }
  }

  // no priority func here
  const encrypt = (value) => {
    const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    return encryptedValue
  }

  const decrypt = (value) => {
    const decryptedValue = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedValue
  }


  return {
    provide: {
      randomProfileImage,
      getImage,
      redirectProfile,
      // encrypt,
      // decrypt,
      formatNumberWithK,
      numberFormat,
      chaosOrbFor,
      chaosOrb,
      user,
      hashSha256,
      convertToRelativeTime,
      // shareLink, // idk fk this shit
      share,
      copyText,
    }
  }

})

