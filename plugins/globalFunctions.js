// GLOBAL FUNCTIONS 
import { Utils } from "~/enums/Utils"
import CryptoJS from 'crypto-js'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    console.log('Global Functions PLugin ✅')
  })

  // Var List
  const baseStorageUrl = computed(() => {
    const runtimeConfig = useRuntimeConfig()
    return runtimeConfig.public.storagelUrl
  })
  const SECRET_KEY = Utils.SECRET_KEY_CRYPTO
  const encryptionKey = CryptoJS.enc.Utf8.parse(CryptoJS.SHA256("__n0t1f1c4t10n").toString(CryptoJS.enc.Hex).slice(0, 32));
  const iv = CryptoJS.enc.Utf8.parse('1223334444555556'); 

  // Func List
  const randomProfileImage = (display_name) => {
    const formattedName = display_name.replace(/\s+/g, "+");
    return `https://eu.ui-avatars.com/api/?background=random&name=${formattedName}`;
  }
  const getImage = (key) => {
    const url = baseStorageUrl.value + key
    return url
  }

  const encrypt = (value) => {
    const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    return encryptedValue
  }

  const decrypt = (value) => {
    const decryptedValue = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedValue
  }

  const encryptUserId = (userId) => {
    const encrypted = CryptoJS.AES.encrypt(userId.toString(), encryptionKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(); 
};

  const decryptUserId = (encryptedId) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedId, encryptionKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  return {
    provide: {
      randomProfileImage,
      getImage,
      encrypt,
      decrypt,
      encryptUserId,
      decryptUserId,
    }
  }

})

