import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import Navbar from "./components/Navbar";
import './Teams.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';
import { collection, getDocs } from "firebase/firestore";

async function fetchName() {
  const querySnapshot = await getDocs(collection(db, "userinfo"))

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data()});
  });
  return data;
}

const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    const [userName, setUserName] = useState(0);

    useEffect(() => {
      async function fetchData() {
        const data = await fetchName()
        data.forEach((nama_data) => {
          if (nama_data.id === user.uid) {
            setUserName(nama_data.FullName);
          }
        });
      }

      fetchData();   
    }, [])

    // console.log(userName)

    // Randomize function
    const daya = ["R1/900 VA", "R1/1300 VA", "R1/2200 VA", "R2/3500 VA", "R2/5500 VA"];
    const random = Math.floor(Math.random() * daya.length);
    const getRandomInteger = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
    
      return Math.floor(Math.random() * (max - min)) + min
    }
    const randomInteger = getRandomInteger(300000, 500000)
    const numberWithCommas = (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const [walletAddress, setWalletAddress] = useState("");
    // const [walletBalance, setWalletBalance] = useState(0.0);

   // Requests access to the user's META MASK WALLET
   async function requestAccount() {
     console.log('Requesting account...');
 
     // Check if Meta Mask Extension exists 
     if(window.ethereum) {
       console.log('detected');
 
       try {
         const accounts = await window.ethereum.request({
           method: "eth_requestAccounts",
         });
         setWalletAddress(accounts[0]);

        //  const balance = await window.ethereum.request({
        //   "method": "eth_getBalance",
        //   "params": [
        //     accounts[0],
        //     "latest"
        //   ]
        // });
        // const ethBalance = window.ethereum.
        // console.log(balance);
       } catch (error) {
         console.log('Error connecting...');
       }
 
     } else {
       alert('MetaMask not detected');
     }
   }
 
   // Create a provider to interact with a smart contract
   async function connectWallet() {
     if(typeof window.ethereum !== 'undefined') {
       await requestAccount();
 
       const provider = new ethers.providers.Web3Provider(window.ethereum);
     }
   }

    return(
        <div className = "container">
            <Navbar />
            <div className = "row justify-content-center">
                <div className = "info">
                    <div className = "image">
                        <img src="chain.jpg" alt="chain"></img>
                    </div>
                    <div className = "text">
                        <br></br>
                        <h2>Informasi Tagihan</h2>
                        <br></br>
                        <p>Nama: {userName}</p>
                        <p>IDPEL: {Math.floor(Math.random() * 999999999999)}</p>
                        <p>Daya: {daya[random]}</p>
                        <p>Tanggal: {today}</p> 
                        {/* Tarif/Daya: R1/000000900VA */}
                        <p>Total Bayar: Rp{numberWithCommas(randomInteger)}</p>
                        <button type = "submit" className = "submit-btn" onClick = {(e) => logoutUser(e)}>Bayar</button>
                        <br></br>
                        <br></br>
                        <button onClick={requestAccount}>Connect Metamask Account</button>
                        <p>Wallet Address: {walletAddress}</p>
                        <br></br>
                        <br></br>
                        {/* <p>Wallet Address: {ethBalance}</p> */}
                        {/* <p>Wallet Balance: {walletBalance}</p> */}
                    </div>             
                </div>
            </div>
        </div>       
    )    
}

export default Profile
