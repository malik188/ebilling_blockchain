import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Panduan = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    return(
        <div className = "container">
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#panduan">Panduan</Nav.Link>
                    <Nav.Link href="#bayar">Bayar</Nav.Link>
                </Nav>
                <button type = "submit" className = "btn_logout" onClick = {(e) => logoutUser(e)}>Logout</button>
                </Container>
            </Navbar>
            <div className = "row justify-content-center">
                <div className = "col-md-4 text-center">
                    <p>Welcome <em className = "text-decoration-underline">{ user.email }</em>. You are logged in!</p>
                    <div className = "d-grid gap-2">
                        <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => logoutUser(e)}>Logout</button>
                    </div>                
                </div>
            </div>
        </div>       
    )    
}

export default Panduan
