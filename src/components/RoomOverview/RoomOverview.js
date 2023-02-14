import React, { useEffect, useState } from "react";
import { getRoomsSortedBy } from "../HotelApi";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CalendarLogic from "../CalendarLogic";

function RoomOverview() {
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);

  const fetchRoom = async () => {
    const res = (await getRoomsSortedBy()).find(
      (element) => element.id === roomId
    );
    const { name, price, pictures, available, bookedDates } = res;
    setRooms({
      name,
      price,
      pictures,
      available,
      bookedDates,
    });
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <div>
      <OtherPagesNavbar />
      <h1>Toa ülevaade</h1>
      <div className="room_card room_card_1">
        <img src={rooms.pictures} alt="" className="img img_1" />
        <div className="room_desc">
          <h3>{rooms.name}</h3>
          <p style={{ marginTop: "1em" }}>{rooms.available} saadaval</p>
          <h3 className="room_price">{rooms.price} € / öö</h3>
          <Link
            to={`/book-rooms-schedule/${roomId}/${rooms.name}`}
            className="btn"
            style={{ padding: "1.2em 1.6em" }}
          >
            Broneeri
          </Link>
          <div className="room_type_images">
            {rooms.pictures &&
              rooms.pictures.map((image) => {
                return (
                  <div key={image}>
                    <img src={image} alt="" className="img_2" />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="calendar_container">
          <div>
            <h3 style={{ marginBottom: "0.5em" }}>Saadavus</h3>
            <CalendarContainer>
              <CalendarLogic rooms={rooms} />
            </CalendarContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomOverview;

const CalendarContainer = styled.div`
  .highlighted {
    color: white;
    background-color: #991ba1;
  }
  .highlighted:hover {
    background-color: #801687;
  }
`;
