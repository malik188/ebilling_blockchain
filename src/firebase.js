// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnRdh9KqpuuCwW9nZIQjjjpe2JPl_VJaE",
  authDomain: "e-billingblockchain.firebaseapp.com",
  projectId: "e-billingblockchain",
  storageBucket: "e-billingblockchain.appspot.com",
  messagingSenderId: "399867237814",
  appId: "1:399867237814:web:b10b512d43c656b7769d17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }