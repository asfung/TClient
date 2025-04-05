import CryptoJS from "crypto-js";
import { Utils } from "~/enums/Utils";
import { useAuthStore } from "~/stores/Auth";

const SECRET_KEY = Utils.SECRET_KEY_CRYPTO

export const useCryptoLocalStorage = () => {
  const setItem = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      const encryptedSerializedValue = encrypt(serializedValue)
      localStorage.setItem(key, encryptedSerializedValue);
    } catch (error) {
      // console.error(`err: ${error.message}`);
    }
  };

  const getItem = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      const decryptItem = decrypt(item)
      if (item === null) return defaultValue;
      return JSON.parse(decryptItem);
    } catch (error) {
      // console.error(`err: ${error.message}`); // err: Cannot read properties of null (reading 'salt')
      return defaultValue;
    }
  };


  const encrypt = (value) => {
    // const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    // return encryptedValue
    const authStore = useAuthStore()
    const encryptedValue = authStore.encrypt(value)
    return encryptedValue
  }

  const decrypt = (value) => {
    // const decryptedValue = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    // return decryptedValue
    const authStore = useAuthStore()
    const decryptedValue = authStore.decrypt(value)
    return decryptedValue
  }

  const encryptURI = (data) => {
    if (!data) return '';
    const stringified = typeof data === 'string' ? data : JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
    return encodeURIComponent(encrypted);
  };

  const decryptURI = (encryptedData) => {
    if (!encryptedData) return '';
    try {
      const decoded = decodeURIComponent(encryptedData);
      const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      try {
        return JSON.parse(decrypted);
      } catch {
        return decrypted;
      }
    } catch (error) {
      console.error('Decryption failed:', error);
      return '';
    }
  };


  return {
    setItem,
    getItem,
    // encrypt,
    // decrypt,
    encryptURI,
    decryptURI
  };
};