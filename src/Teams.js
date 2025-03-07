import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import Navbar from "./components/Navbar";
import './Teams.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from 'react';
import { ethers } from 'ethers';
import { collection, getDocs } from "firebase/firestore";
import Swal from 'sweetalert2'

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
      // min = Math.ceil(min)
      // max = Math.floor(max)
    
      return Math.floor(Math.random() * (max - min)) + min
    }
    // Harga bayar listrik Rp200.000 - Rp500.000
    const randomInteger = getRandomInteger(12.21, 30.53)
    const numberWithCommas = (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    // Metamask
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
  
    const connectWallet = () => {
      if (window.ethereum) {
          window.ethereum.request({method: 'eth_requestAccounts'})
          .then(result => {
            accountChanged([result[0]])
          })
          setInterval(() => {
          }, 5000)
          Swal.fire({
            title: "Good job!",
            text: "MetaMask berhasil terhubung",
            icon: "success"
          });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Install Metamask Terlebih Dahulu!!!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  
    const accountChanged = (accountName) => {
      setDefaultAccount(accountName)
      getUserBalance(accountName)
  
    }
  
    const getUserBalance = (accountAddress) => {
      window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
    }

    var amount = ((numberWithCommas(randomInteger) / 3540.05).toFixed(4)).toString();
    const EtherToWei = ethers.utils.parseUnits(amount,"ether");

    console.log(typeof(defaultAccount.toString()))

    async function sendTransaction(event) {
      event.preventDefault();
      let params = [{
        from: defaultAccount.toString(),
        to: "0xe9E99062038e14724f4d9CB3546afDf45808642e",
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: Number(EtherToWei).toString(16),
      }]
  
      let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err) => {
        console.log(err)
      })
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
                        <p>Total Bayar: Rp{numberWithCommas(randomInteger*16400)}</p>
                        {/* <button type = "submit" className = "submit-btn" onClick = {(e) => logoutUser(e)}>Bayar</button> */}
                        {/* <br></br>
                        <br></br> */}
                        <button onClick={connectWallet}>Connect Metamask Account</button>
                        <br></br>
                        <br></br>
                        <p>Address: {defaultAccount}</p>
                        <p>Balance:  {userBalance}</p>
                        <form onSubmit={sendTransaction}>
                          <input className = "bayar" type="submit" value="Bayar"/>
                        </form>
                    </div>             
                </div>
            </div>
        </div>       
    )    
}

export default Profile
