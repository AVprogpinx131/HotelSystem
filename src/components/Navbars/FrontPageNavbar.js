import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function FrontPageNavbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="navbar home_page_navbar">
      <Link to="/" className="logo_text home_page_logo_text">
        Hotell "Omega"
      </Link>
      <nav className="links_container" ref={navRef}>
        <div className="navbar_links">
          <Link to="/register" className="navbar_link">
            Registreeru
          </Link>
          <p className="text_1">või</p>
          <Link to="/enter" className="navbar_link">
            Sisene
          </Link>
        </div>
        <button className="log_out_btn">Logi välja</button>
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
