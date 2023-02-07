import React from "react";
import { Link } from "react-router-dom";

function LogInNavbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" className="logo_text">
          Hotell "Omega"
        </Link>
      </div>
      <div style={{display: "flex"}}>
        <p>Pole veel kontot?</p>
        <Link to="/register" className="sign_in_link">
          Registreeru
        </Link>
      </div>
    </header>
  );
}

export default LogInNavbar;
