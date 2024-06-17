import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Navbar from "./components/Navbar";
import './Teams.css'
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { ethers } from 'ethers';

const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    const [walletAddress, setWalletAddress] = useState("");
    // const [walletBalance, setWalletBalance] = useState(0.0);

   // Requests access to the user's META MASK WALLET
   // https://metamask.io
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
                        <p>Nama:{user.email}</p>
                        <p>IDPEL: 111111111111</p>
                        <p>Tanggal: 11 Juni 2024</p>
                        <p>Daya: 900 VA</p> 
                        {/* Tarif/Daya: R1/000000900VA */}
                        <p>Total Bayar: Rp 500.000</p>
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
