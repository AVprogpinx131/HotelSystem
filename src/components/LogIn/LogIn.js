import React, { useState } from "react";
import LogInNavbar from "../Navbars/LogInNavbar";
import { UserAuth } from "../UserContext";
import AuthPicture from "./AuthPicture.png";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const navigate = useNavigate();
  const { logIn, user } = UserAuth();

  function handleSubmit(e) {
    e.preventDefault();
    logIn(username, password);
    navigate('/');
    window.location.reload();
  }

  return (
    <div>
      <LogInNavbar />
      <div className="contact_bg">
        <form onSubmit={handleSubmit}>
          <div className="grid-for-contact">
            <h2 style={{ marginTop: "2em", marginBottom: "3em" }}>
              Kinnita konto andmed
            </h2>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Kasutajatunnus"
                required
                className="auth_input"
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>
            <div className="password">
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Parool"
                  required
                  className="auth_input"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
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
