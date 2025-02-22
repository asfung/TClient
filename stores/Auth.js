import { defineStore } from "pinia";
import CryptoJS from "crypto-js";
import { Credentials } from "~/enums/Credentials"

const SECRET_KEY = 'SIGMASIGMABOIS';

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      token: localStorage.getItem('token') || null,
      credentials: localStorage.getItem('credentials') || null,
    }
  },
  getters: {
    hello(){
      return this.test()
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
    getCredentials(credentials){
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

    decrypt(value){
      const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
      // const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      return bytes;
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