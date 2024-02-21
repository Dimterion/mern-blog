import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-54f8f.firebaseapp.com",
  projectId: "mern-blog-54f8f",
  storageBucket: "mern-blog-54f8f.appspot.com",
  messagingSenderId: "253785894464",
  appId: "1:253785894464:web:28454416bd0175a725b9a5",
};

export const app = initializeApp(firebaseConfig);
