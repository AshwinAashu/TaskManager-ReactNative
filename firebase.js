// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXmiuv1kmTLrOXrofLIhXRg1mxMYjWxfU",
  authDomain: "todo-reactnative-auth.firebaseapp.com",
  projectId: "todo-reactnative-auth",
  storageBucket: "todo-reactnative-auth.appspot.com",
  messagingSenderId: "963420721989",
  appId: "1:963420721989:web:b964d8996af18738f3e42c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
