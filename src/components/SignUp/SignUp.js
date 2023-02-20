import { createContext, useContext, useEffect, useState } from 'react';
import SignUpNavbar from "../Navbars/SignUpNavbar";
import AuthPicture from "../LogIn/AuthPicture.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../UserContext";

function SignUp() {
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const [ firstname, setFirstname ] = useState();
  const [ lastname, setLastname ] = useState();
  const navigate = useNavigate();
  const { createUser, user } = UserAuth();

  function handleSubmit(e) {
    e.preventDefault();
    createUser(username, password, firstname, lastname);
    navigate('/');
    window.location.reload();
  }

  return (
    <div>
      <SignUpNavbar />
      <div className="contact_bg">
        <form onSubmit={handleSubmit}>
          <div className="grid-for-contact">
            <h2 style={{ marginTop: "2em", marginBottom: "3em" }}>
              Loo endale sobiv konto
            </h2>
            <div>
              <input
                type="text"
                placeholder="Eesnimi"
                className="auth_input"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="password">
              <input
                type="text"
                placeholder="Perekonnanimi"
                className="auth_input"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="password">
              <input
                type="text"
                placeholder="Kasutajatunnus"
                className="auth_input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="password">
              <div>
                <input
                  type="password"
                  placeholder="Parool"
                  className="auth_input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn" type="submit">
                Registreeru
              </button>
            </div>
          </div>
          <img src={AuthPicture} alt="" className="auth_picture" />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
