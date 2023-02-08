import React from "react";
import LogInNavbar from "../Navbars/LogInNavbar";
import AuthPicture from "./AuthPicture.png";

function LogIn() {
  return (
    <div>
      <LogInNavbar />
      <div className="contact_bg">
        <form>
          <div className="grid-for-contact">
            <h2 style={{ marginTop: "2em", marginBottom: "3em" }}>
              Kinnita konto andmed
            </h2>
            <div>
              <input
                type="text"
                placeholder="Kasutajatunnus"
                required
                className="auth_input"
              />
            </div>
            <div className="password">
              <div>
                <input
                  type="password"
                  placeholder="Parool"
                  required
                  className="auth_input"
                />
              </div>
              <button className="btn" type="submit">
                Sisene
              </button>
            </div>
          </div>
          <img src={AuthPicture} alt="" className="auth_picture" />
        </form>
      </div>
    </div>
  );
}

export default LogIn;
