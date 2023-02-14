import React, { useState, useEffect } from "react";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { getRoomsSortedBy } from "../HotelApi";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ChangeRooms() {
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);

  const fetchRoom = async () => {
    const res = (await getRoomsSortedBy()).find(
      (element) => element.id === roomId
    );
    const { pictures } = res;
    setRooms({ pictures });
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const removeImg = (index) => {
    if (rooms.pictures.length > 1) {
      const newImg = [...rooms.pictures].filter((_, i) => i !== index);
      setRooms({ pictures: newImg });
    } else {
      alert("Ainult üks tuba on alles, seega ei saa kustutada.");
    }
  };

  return (
    <div>
      <OtherPagesNavbar />
      <div className="outer_images">
        {rooms.pictures &&
          rooms.pictures.map((image, index) => {
            return (
              <div key={image} className="inner_images">
                <MdDelete
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  className="delete-btn"
                  onClick={() => removeImg(index)}
                />
                <div>
                  <img src={image} alt="" className="image" />
                </div>
              </div>
            );
          })}
      </div>
      <div className="box">
        <div>
          <label>Toa tüüp</label>
          <input type="text" className="input" />
        </div>
        <div>
          <label>Hind</label>
          <input type="number" className="input" />
        </div>
        <div>
          <label>Tubade arv</label>
          <input type="number" className="input" />
        </div>
      </div>
      <div className="box box_1">
        <div>
          <label>Kirjeldus</label>
          <div>
            <textarea cols="33" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeRooms;
