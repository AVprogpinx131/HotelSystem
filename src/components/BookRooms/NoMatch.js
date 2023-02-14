import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <div className="room_types">
      <h2 className="error_message" style={{ marginBottom: "2em" }}>
        Vali toa tüüp enne "Edasi" nupu vajutamist
      </h2>
      <Link to="book-rooms" className="btn btn_1">
        Tagasi
      </Link>
    </div>
  );
}

export default NoMatch;
