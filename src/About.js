import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Navbar from "./components/Navbar";
import './Profile.css'

const Profile = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    return(
        <div className = "container">
            <Navbar />
            <div className = "row justify-content-center">
                <div className = "col-md-4 text-center">
                    <br></br>
                    <h2>Panduan Singkat Tata Cara Pembayaran Tagihan Listrik Berbasis Blockchain</h2>
                    <br></br>
                    <div className = "d-grid gap-2">
                        <img src="guide.jpg" class="img-thumbnail" alt="guide"></img>
                    </div>
                    <br></br>
                    <br></br>
                    <p>1. Pergi ke Halaman "Bayar Listrik".</p>
                    <p>2. Tekan tombol "Connect Metamask Account" agar situs web dapat terhubung dengan wallet anda.</p>
                    <p>3. Pastikan anda telah menginstal extension MetaMask pada browser yang anda gunakan.</p>
                    <p>4. Tekan tombol "Bayar" untuk melakukan pembayaran.</p>
                    <p>5. Pastikan anda memiliki saldo yang cukup pada wallet anda agar transaksi dapat berhasil dilakukan</p>
                </div>
            </div>
        </div>       
    )    
}

export default Profile
