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
      credentialsDecrypted: null, 
    }
  },
  getters: {
    credentialsJson(){
      const credentialJson = this.decrypt(this.credentials);
      return credentialJson
    },
  },
  actions: {
    setCredentials(credentials) {
      const jsonCredentials = JSON.stringify(credentials);
      const encryptedCredentials = CryptoJS.AES.encrypt(jsonCredentials, SECRET_KEY).toString();
      localStorage.setItem('credentials', encryptedCredentials);
      this.credentials = encryptedCredentials;
      this.credentialsDecrypted = credentials; // keep reactive
    },
    // setCredentials(credentials){
    //   const jsonCredentials = JSON.stringify(credentials);
    //   const encryptedCredentials = CryptoJS.AES.encrypt(jsonCredentials, SECRET_KEY).toString();
    //   localStorage.setItem('credentials', encryptedCredentials);
    //   this.credentials = encryptedCredentials
    //   this.credentialsDecrypted = credentials; 
    // },
    // setCredentialBy(credentialType, data){
    //   if(!this.credentials){
    //     return null
    //   }
    //   const decryptCredentials = CryptoJS.AES.decrypt(this.credentials, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    //   const jsonCredentialsOri = JSON.parse(decryptCredentials)
    //   var jsonCredentials = JSON.parse(decryptCredentials)
    //   console.log(jsonCredentialsOri)

    //   if(credentialType === Credentials.TOKEN){
    //     jsonCredentials.authorization.token = data 
    //     const jsonCredentialsStr = JSON.stringify(jsonCredentials);
    //     const encryptedCredentials = this.encrypt(jsonCredentialsStr);
    //     localStorage.setItem('credentials', encryptedCredentials) // ON/OFF FOR A WHILE
    //   }
    //   if(credentialType === Credentials.USER){
    //     if(typeof data !== "object"){
    //       console.log('tidak bisa')
    //       return 'can\'t set cause isn\'t object type';
    //     } 
    //     const authorizationTemp = jsonCredentials.authorization
    //     jsonCredentials = data
    //     jsonCredentials.authorization = authorizationTemp
    //     const jsonCredentialsStr = JSON.stringify(jsonCredentials)
    //     const encryptedCredentials = this.encrypt(jsonCredentialsStr)
    //     localStorage.setItem('credentials', encryptedCredentials) // ON/OFF FOR A WHILE
    //   }
    // },
    setCredentialBy(credentialType, data) {
      if (!this.credentials) return null;
    
      const decrypted = CryptoJS.AES.decrypt(this.credentials, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      let jsonCredentials = JSON.parse(decrypted);
    
      if (credentialType === Credentials.TOKEN) {
        jsonCredentials.authorization.token = data;
      } else if (credentialType === Credentials.USER) {
        if (typeof data !== 'object') return;
        const authorization = jsonCredentials.authorization;
        jsonCredentials = { ...data, authorization };
      }
    
      const jsonStr = JSON.stringify(jsonCredentials);
      const encrypted = this.encrypt(jsonStr);
      localStorage.setItem('credentials', encrypted);
    
      this.credentials = encrypted;
      this.credentialsDecrypted = jsonCredentials; // 🔁 update reactive data
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
    async signOut(){
      try{
        const { $axios } = useNuxtApp()
        const response = await $axios.post('/Logout');
        const data = response.data
        if (response.status === 200) {
          console.log('berhasil logout')
          this.userLogout()
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
          };
        }
      }catch(e){
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    userLogout(){
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
    async changePassword(payload){
      try{
        const { $axios } = useNuxtApp()
        const response = await $axios.post('/ChangePassword', payload)
        // if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: response.data,
            message: response.data.message || response.data.error || 'An error occurred'
          };
        // }
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
    encrypt(value){
      const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
      return encryptedValue
    },

    decrypt(value){
      const decryptedValue = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return decryptedValue
    },

  },
})
