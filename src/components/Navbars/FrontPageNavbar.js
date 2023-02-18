import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserAuth } from "../UserContext";

function FrontPageNavbar() {
  const { user, logOut } = UserAuth();
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  function handleLogOut() {
    logOut();
    navigate('/');
    window.location.reload();
  }

  return (
    <header className="navbar home_page_navbar">
      <Link to="/" className="logo_text home_page_logo_text">
        Hotell "Omega"
      </Link>
      <nav className="links_container" ref={navRef}>
        {
          !user && (
            <div className="navbar_links">
              <Link to="/register" className="navbar_link">
                Registreeru
              </Link>
              <p className="text_1">või</p>
              <Link to="/enter" className="navbar_link">
                Sisene
              </Link>
            </div>
          )
        }
        { user && (
          <>
            <p>Tere, {user.firstname}!</p>
            <button className="log_out_btn" onClick={handleLogOut}>Logi välja</button>
          </>
        ) }

        <button className="nav_btn nav_close_btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav_btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default FrontPageNavbar;
