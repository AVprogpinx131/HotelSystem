import React, { useState, useEffect } from "react";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import styled from "styled-components";
import { getRoomsSortedBy } from "../HotelApi";
import CalendarLogic from "../CalendarLogic";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";

function BookRoomsSchedule() {
  const [date, setDate] = useState(new Date());
  const [rooms, setRooms] = useState([]);
  const history = useNavigate();
  const { roomValue } = useParams();
  const { roomId } = useParams();

  const getDayAndMonth = (date) => {
    const month = date.toLocaleString("et-EE", {
      day: "numeric",
      month: "long",
    });
    return `${month}`;
  };

  const handleClick = () => {
    history(
      `/details?firstDate=${Math.floor(
        date[0].getTime() / 1000
      )}&secondDate=${Math.floor(
        date[1].getTime() / 1000
      )}&roomProperty=${roomValue}`
    );
  };

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
      <h1>Broneeri tuba</h1>
      <div className="calendar_container_1">
        {date.length > 0 ? (
          <div className="calendar_info">
            <h3 className="room_type">Ajavahemik</h3>
            Valitud vahemikus {getDayAndMonth(date[0])} kuni{" "}
            {getDayAndMonth(date[1])}
          </div>
        ) : (
          ""
        )}
        <CalendarContainer className="calendar_data">
          <div>
            <h3 style={{ marginBottom: "0.5em" }}>Saadavus</h3>
            <CalendarLogic rooms={rooms} />
          </div>
          <div>
            <h3 style={{ marginBottom: "0.5em" }}>Vali sobiv vahemik</h3>
            <Calendar
              value={date}
              onChange={setDate}
              selectRange={true}
              locale="et-EE"
            />
          </div>
        </CalendarContainer>
        <button className="btn btn_2" onClick={handleClick}>
          Edasi
        </button>
      </div>
    </div>
  );
}

export default BookRoomsSchedule;

const CalendarContainer = styled.div`
  display: flex;
  gap: 100px;
  margin-top: 2em;

  .highlighted {
    color: white;
    background-color: #991ba1;
  }
  .highlighted:hover {
    background-color: #801687;
  }
`;
