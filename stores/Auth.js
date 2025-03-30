import { defineStore } from "pinia";
import CryptoJS from "crypto-js";
import { Credentials } from "~/enums/Credentials"
import { Utils } from "~/enums/Utils";

// const SECRET_KEY = 'SIGMASIGMABOIS';
const SECRET_KEY = Utils.SECRET_KEY_CRYPTO

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      credentials: localStorage.getItem('credentials') || null,
    }
  },
  getters: {
    credentialsJson(){
      const credentialJson = this.decrypt(this.credentials);
      return credentialJson
    },
  },
  actions: {
    test(){
      return 'hello test'
    },
    setCredentials(credentials){
      const jsonCredentials = JSON.stringify(credentials);
      const encryptedCredentials = CryptoJS.AES.encrypt(jsonCredentials, SECRET_KEY).toString();
      localStorage.setItem('credentials', encryptedCredentials);
      this.credentials = encryptedCredentials
    },
    setCredentialBy(credentialType, data){
      if(!this.credentials){
        return null
      }
      const decryptCredentials = CryptoJS.AES.decrypt(this.credentials, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const jsonCredentialsOri = JSON.parse(decryptCredentials)
      var jsonCredentials = JSON.parse(decryptCredentials)
      console.log(jsonCredentialsOri)

      if(credentialType === Credentials.TOKEN){
        jsonCredentials.authorization.token = data 
        const jsonCredentialsStr = JSON.stringify(jsonCredentials);
        const encryptedCredentials = this.encrypt(jsonCredentialsStr);
        // localStorage.setItem('credentials', encryptedCredentials) // ON/OFF FOR A WHILE
      }
      if(credentialType === Credentials.USER){
        if(typeof data !== "object"){
          console.log('tidak bisa')
          return 'can\'t set cause isn\'t object type';
        } 
        const authorizationTemp = jsonCredentials.authorization
        jsonCredentials = data
        jsonCredentials.authorization = authorizationTemp
        const jsonCredentialsStr = JSON.stringify(jsonCredentials)
        const encryptedCredentials = this.encrypt(jsonCredentialsStr)
        // localStorage.setItem('credentials', encryptedCredentials) // ON/OFF FOR A WHILE
      }
    },
    getCredentials(credentials){
      if(!this.credentials){
        return null
      }
      const decryptCredentials = CryptoJS.AES.decrypt(this.credentials, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const jsonCredentials = JSON.parse(decryptCredentials)
      // console.log(decryptCredentials)

      if(!credentials){
        return null
      }
      if(credentials === Credentials.TOKEN){
        return jsonCredentials.authorization.token
      }
      if(credentials === Credentials.USER){
        delete jsonCredentials.authorization // VASSSSSSS
        return jsonCredentials
      }
    },
    formattedCredentials(data){
      const formattedData = {
        ...data.user,
        authorization: data.authorization
      };
      return formattedData
    },

    setToken(token) {
      const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
      localStorage.setItem('token', encryptedToken);
      this.token = encryptedToken;
    },
    getToken() {
      if (!this.token) return null;
      const bytes = CryptoJS.AES.decrypt(this.token, SECRET_KEY);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedToken;
    },
    signOut(){
      localStorage.removeItem('credentials')
      localStorage.removeItem('resources')
    },
    logout() {
      localStorage.removeItem('token');
      this.token = null;
    },

    // API 
    async loginAction(payload) {
      return await this.apiRequest('/Login', payload);
    },
    async registerAction(payload) {
      return await this.apiRequest('/Register', payload);
    },

    async checkToken(){
      try{
        const { $axios } = useNuxtApp()
        const response = await $axios.post('/CheckToken')

        return {
          response: response,
          status: response.status,
          data: response.data,
          message: response.data.message || response.data.error || 'An error occurred'
        };

      }catch(e){
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },

    async apiRequest(endpoint, payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(endpoint, payload);
        
        if ([401, 404, 500].includes(response.status)) {
          return {
            response: response,
            status: response.status,
            data: response.data,
            message: response.data.message || response.data.error || 'An error occurred'
          };
        }
        
        return {
          response: response,
          status: response.status,
          data: response.data,
          message: 'Success'
        };
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async userProfile(username){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get(`/user/${username}`);
        const data = response.data.data
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success'
          };
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    encrypt(value){
      const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
      return encryptedValue
    },

    decrypt(value){
      const decryptedValue = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return decryptedValue
    },

    // async loginAction(payload){
    //   try{
    //     const { $axios } = useNuxtApp()
    //     const response = await $axios.post('/Login', payload, {
    //       headers: {
    //         // 'Content-Type': 'application/json',
    //       }
    //     })
        
    //     if(response.status === 401 ||  response.status === 404){
    //       console.log('benar')
    //       return {
    //         response: response,
    //         status: response.status,
    //         data: response.data,
    //         message: response.data.message
    //       }
    //     }else{
    //       return {
    //         response: response,
    //         status: response.status,
    //         data: response.data,
    //         message: 'Berhasil Login'
    //       }
    //     }

    //   }catch(e){
    //     return {
    //       status: e.response?.status || 500,
    //       data: null,
    //       message: e.response?.data?.message || e.message || 'An error occurred',
    //       // message: e.message || 'An error occurred'
    //     }
    //   }
    // },

    // async registerAction(payload){
    //   try{
    //     const { $axios } = useNuxtApp()
    //     const response = await $axios.post('/Register', payload, {
    //       headers: {
    //         // 'Content-Type': 'application/json',
    //       }
    //     })
        
    //     if(response.status === 500){
    //       return {
    //         response: response,
    //         status: response.status,
    //         data: response.data,
    //         message: response.data.error
    //       }
    //     }else{
    //       return {
    //         response: response,
    //         status: response.status,
    //         data: response.data,
    //         message: 'Berhasil Login'
    //       }
    //     }

    //   }catch(e){
    //     return {
    //       status: e.response?.status || 500,
    //       data: null,
    //       message: e.response?.data?.message || e.message || 'An error occurred',
    //       // message: e.message || 'An error occurred'
    //     }
    //   }
    // },
   
    async generateKey() {
      // Generate a new AES-GCM key
      const key = await crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      );
      return key;
    },

    async importKey(rawKey) {
      const key = await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        true,
        ["encrypt", "decrypt"]
      );
      return key;
    },

    async encryptToken(token) {
      const key = await this.generateKey();
      const iv = crypto.getRandomValues(new Uint8Array(12)); 
      const encoder = new TextEncoder();
      const encodedToken = encoder.encode(token);

      const encryptedData = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        encodedToken
      );

      const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
      const encryptedArray = Array.from(new Uint8Array(encryptedData));
      const encryptedHex = encryptedArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

      const exportedKey = await crypto.subtle.exportKey("raw", key);
      const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
      localStorage.setItem('encryptionKey', base64Key);

      return `${ivHex}:${encryptedHex}`;
    },

    async decryptToken(encryptedToken) {
      const [ivHex, encryptedHex] = encryptedToken.split(':');
      const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      const encryptedArray = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

      const base64Key = localStorage.getItem('encryptionKey');
      const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
      const key = await this.importKey(rawKey);

      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        encryptedArray
      );

      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    },


  },
})

// export default useAuthStore 