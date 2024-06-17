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
                    <h2>Panduan Lengkap Tata Cara Pembayaran Tagihan Listrik Berbasis Blockchain</h2>
                    <br></br>
                    <div className = "d-grid gap-2">
                        <img src="guide.jpg" class="img-thumbnail" alt="guide"></img>
                    </div>                
                </div>
            </div>
        </div>       
    )    
}

export default Profile
