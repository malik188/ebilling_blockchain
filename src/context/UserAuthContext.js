import { useContext, createContext, useEffect, useState } from "react"

import {
  AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut, getAuth, sendEmailVerification, updateProfile,
} from 'firebase/auth'
import { auth, db } from "../firebase";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";


const userContext = createContext();
export const useAuth = () => { return useContext(userContext) }


const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("")
  const [currentuser, setuser] = useState()
  useEffect(
    () => {
      onAuthStateChanged(auth, user => {
        console.log(user)
        if (user) {
          setuser(user)
          console.log("u are logging")
        }
        else {
          // alert("u are logout")
        }
      })
    }, [currentuser]
  )

  const SignUp = async (email, password, FullName) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        try {
          // const docRef = await addDoc(collection(db, "users"), {
          //   FullName,
          //   userId: `${result.user.uid}`
          // });
          await updateProfile(auth.currentUser, { displayName: FullName }).catch(
            (err) => console.log(err)
          );
          const ref = doc(db, "userinfo", result.user.uid)
          const docRef = await setDoc(ref, { FullName })
          alert("Welcome new User create successfully")
          
          console.log("Document written with ID: ", docRef.id);
          console.log(result)
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    ).catch(err => {
      if (err.code === "auth/email-already-in-use") {

        setInterval(() => {
          setError("")
        }, 5000)
        setError("email already in use try another email")
      }
      else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {

        setInterval(() => {
          setError("")
        }, 5000)
        setError("Password Must be 6 character")
      }

      else {
        setError(err.message)
      }
    })
  }
  
  // Login Functinallity
  const UserLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Logout Functionality
  const logout = () => {
    return signOut(auth)
  }
  const value = {
    SignUp,
    UserLogin,
    logout,
    error,
    currentuser
  }
  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  )
}

export default UserAuthContext