import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Panduan from './Panduan';
import About from "./About";
import Teams from "./Teams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { ethers } from 'ethers';

const App = () => {
   const [walletAddress, setWalletAddress] = useState("");

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
       } catch (error) {
         console.log('Error connecting...');
       }
 
     } else {
       alert('Meta Mask not detected');
     }
   }
 
   // Create a provider to interact with a smart contract
   async function connectWallet() {
     if(typeof window.ethereum !== 'undefined') {
       await requestAccount();
 
       const provider = new ethers.providers.Web3Provider(window.ethereum);
     }
   } 
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = { <Layout></Layout> }>
            <Route index element = { <Login></Login> }></Route>
            <Route path = "/signup" element = { <Signup></Signup> } ></Route>
            <Route path = "/profile" element = { <Profile></Profile> }></Route>
            <Route path = "/panduan" element = { <Panduan></Panduan> }></Route>
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Teams />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App