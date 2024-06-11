// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// auth kurulumu için importlar
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "my-project-1-416006.firebaseapp.com",
  projectId: "my-project-1-416006",
  storageBucket: "my-project-1-416006.appspot.com",
  messagingSenderId: "995392678329",
  appId: "1:995392678329:web:ce00d4ea7f4fdec051ae68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// kimlik doğrulama hizmetinin referansını al
export const auth = getAuth(app);

// google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veritabanının referansını al;
export const db = getFirestore(app);
