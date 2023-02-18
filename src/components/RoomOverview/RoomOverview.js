import React, { useEffect, useState } from "react";
import { getRoom } from "../HotelApi";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CalendarLogic from "../CalendarLogic";

function RoomOverview() {
  const { roomId } = useParams();
  const [ room, setRoom ] = useState([]);

  useEffect(() => {
    getRoom(roomId).then(room => setRoom(room));
  }, [ roomId ]);

  return (
    <div>
      <OtherPagesNavbar />
      <h1>Toa ülevaade</h1>
      <div className="room_card room_card_1">
        {
          room ? (
            <>
              {
                room.pictures && room.pictures.length > 0 ? (
                  <img src={room.pictures[0]} alt="" className="img img_1" />
                ) : (null)
              }
              <div className="room_desc">
                <h3>{room.name}</h3>
                <p style={{ marginTop: "1em" }}>{room.available} saadaval</p>
                <h3 className="room_price">{room.price} € / öö</h3>
                <Link
                  to={`/book-rooms-schedule/${roomId}/${room.name}`}
                  className="btn"
                  style={{ padding: "1.2em 1.6em" }}
                >
                  Broneeri
                </Link>
                <div className="room_type_images">
                  {
                    room.pictures && room.pictures.forEach((picture, i) => {
                      if(!i) return (null);
                      return (<img src={picture} alt="" className="img_2" />)
                    })
                  }
                </div>
              </div>
              <div className="calendar_container">
                <div>
                  <h3 style={{ marginBottom: "0.5em" }}>Saadavus</h3>
                  <CalendarContainer>
                    <CalendarLogic rooms={room} />
                  </CalendarContainer>
                </div>
              </div>
            </>
          ) : (
            <p>See tuba ei eksisteeri</p>
          )
        }
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
