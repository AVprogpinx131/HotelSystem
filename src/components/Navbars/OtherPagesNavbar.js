import React from "react";
import { Link } from "react-router-dom";

function OtherPagesNavbar() {
  return (
    <header className="navbar home_page_navbar">
      <div className="logo">
        <Link to="/" className="logo_text home_page_logo_text">
          Hotell "Omega"
        </Link>
      </div>
    </header>
  );
}

export default OtherPagesNavbar;
