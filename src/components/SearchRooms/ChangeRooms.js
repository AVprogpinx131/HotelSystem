import React from "react";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";

function ChangeRooms() {
  return (
    <div>
      <OtherPagesNavbar />
      <div className="room_types">
        <div className="box">
          <label>Toa tüüp</label>
          <div>
            <input type="text" className="input" />
          </div>
        </div>
        <div className="box">
          <label>Hind</label>
          <div>
            <input type="number" className="input" />
          </div>
        </div>
        <div>
          <label>Kirjeldus</label>
          <div>
            <textarea type="text" className="input" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeRooms;
