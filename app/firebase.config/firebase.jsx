import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGfuNARfEDCXXQ9srYw6fTkBu0dDzHERA",
  authDomain: "e-commerce-9b576.firebaseapp.com",
  projectId: "e-commerce-9b576",
  storageBucket: "e-commerce-9b576.appspot.com",
  messagingSenderId: "1022524166667",
  appId: "1:1022524166667:web:981d87cfca1cccf3fbed0e"
};

const app = initializeApp(firebaseConfig);
let auth;
if (!auth) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), 
  });
}
export const db = getFirestore(app);
export{
  auth
}