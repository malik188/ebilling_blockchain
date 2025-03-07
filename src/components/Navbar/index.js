import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/profile">
                        Home
                    </NavLink>
                    <NavLink to="/about">
                        Panduan
                    </NavLink>
                    <NavLink to="/teams">
                        Bayar Listrik
                    </NavLink>
                </NavMenu>
                {/* <NavBtn>
                    <NavBtnLink to="/signin">
                        Log out
                    </NavBtnLink>
                </NavBtn> */}
            </Nav>
        </>
    );
};

export default Navbar;