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
                <img class="img-responsive" src="home.jpg" alt="home"></img>
                <div className = "text-on-image">
                    <h1>Halo, Sobat PLN!</h1>
                    <p>Selamat datang di situs pembayaran tagihan listrik berbasis blockchain</p>
                </div>
            </div>
        </div>       
    )    
}

export default Profile
