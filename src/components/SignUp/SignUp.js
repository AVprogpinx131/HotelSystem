import React from "react";
import SignUpNavbar from "../Navbars/SignUpNavbar";
import AuthPicture from "../LogIn/AuthPicture.png";

function SignUp() {
  return (
    <div>
      <SignUpNavbar />
      <div className="contact_bg">
        <form>
          <div className="grid-for-contact">
            <h2 style={{ marginTop: "2em", marginBottom: "3em" }}>
              Loo endale sobiv konto
            </h2>
            <div>
              <input type="text" placeholder="Kasutajatunnus" />
            </div>
            <div className="password">
              <div>
                <input type="password" placeholder="Parool" />
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
