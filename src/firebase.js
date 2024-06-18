import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDnRdh9KqpuuCwW9nZIQjjjpe2JPl_VJaE",
  authDomain: "e-billingblockchain.firebaseapp.com",
  projectId: "e-billingblockchain",
  storageBucket: "e-billingblockchain.appspot.com",
  messagingSenderId: "399867237814",
  appId: "1:399867237814:web:b10b512d43c656b7769d17"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth,
}