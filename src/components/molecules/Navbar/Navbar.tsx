import { useState } from "react";
import Link from "../../atoms/Link/Link";
import { navigate } from "@src/helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@src/_states/store";
import { RootState } from "@src/_states/types";
import { logout } from "@src/_states/reducers/auth/auth.slice";

const Navbar = () => {
    const auth = useSelector((state:RootState)=>state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const [isLogoutLoading, setIsLogoutLoading] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const onLogout = () => {
        setIsLogoutLoading(true);
        fetch("/api/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => {
                console.log('Response:', data);
                setIsLogoutLoading(false);
                dispatch(logout());
                navigate("/");
            })
            .catch(error => {
                setIsLogoutLoading(false);
                console.error('Error:', error);
            });
    }
    return (<><nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <Link className="navbar-item" to="/">
                <svg height="160" width="640" xmlns="http://www.w3.org/2000/svg">
                    <text x="5" y="20" fill="pink" stroke="blue" font-size="25">Webivert</text>
                </svg>

            </Link>

            <a role="button" className={`navbar-burger ${openMenu ? "is-active" : ""}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={(e) => { e.preventDefault(); setOpenMenu(!openMenu) }}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${openMenu ? "is-active" : ""}`}>
            <div className="navbar-start">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/about" className="navbar-item">About</Link>
            </div>

            <div className="navbar-end">
                {!!auth.userData ? <>
                    <Link to="/dashboard" className="navbar-item">Dashboard</Link>
                    <div className="navbar-item">
                        <button className="button is-light" type="button" onClick={onLogout} disabled={isLogoutLoading}>
                            Log out {isLogoutLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : null}
                        </button>
                    </div>
                </> :
                    <div className="navbar-item"><Link className="button is-light" to="/login">Log in</Link></div>}

            </div>
        </div>
    </nav></>)
}

export default Navbar