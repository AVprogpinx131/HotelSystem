import React, { useEffect, useState } from "react";
import { getRoom, makeAppointment } from "../HotelApi";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { useNavigate, useParams } from "react-router-dom";

function Details() {
  const searchParams = new URLSearchParams(document.location.search);

  const history = useNavigate();
  const startDate = new Date(...searchParams.get("firstDate").split("-"));
  const endDate = new Date(...searchParams.get("secondDate").split("-"));
  const roomId = searchParams.get("room");

  const [ room, setRoom ] = useState({});
  const [ error, setError ] = useState("");

  useEffect(() => {
    getRoom(roomId).then(room => setRoom(room));
  }, [ roomId ]);

  const milliseconds1 = startDate * 1000;
  const milliseconds2 = endDate * 1000;
  const dateObject1 = new Date(milliseconds1);
  const dateObject2 = new Date(milliseconds2);

  const startDateString = new Intl.DateTimeFormat("et-EE", {
    month: "long",
    day: "numeric",
  }).format(dateObject1);

  const endDateString = new Intl.DateTimeFormat("et-EE", {
    month: "long",
    day: "numeric",
  }).format(dateObject2);

  const handleClick = () => {
    setError("");
    makeAppointment(roomId, dateObject1, dateObject2).then(status => {
      if(status == 200) history('/');
      else if(status == 400) setError("Kuupäevad on juba kinni");
      else setError("Broneerimine ebaõnnestus");
    });
  };

  return (
    <div>
      <OtherPagesNavbar />
      <h1>Broneeri tuba</h1>
      <div className="calendar_container_1">
        <b>{ error }</b>
        <h3 className="room_type">Toa tüüp</h3>
        {room && room.name}
        <h3 className="room_type time">Ajavahemik</h3>
        <div>{`Valitud vahemikus ${startDateString} kuni ${endDateString}`}</div>
        <button className="btn btn_2" onClick={handleClick}>Kinnita</button>
      </div>
    </div>
  );
}

export default Details;
