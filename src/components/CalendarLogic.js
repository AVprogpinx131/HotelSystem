import React from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarLogic({ rooms }) {
  const bookedDatesArray =
    rooms && rooms.bookedDates ? Object.values(rooms.bookedDates) : undefined;

  function tilesClassName({ date, view }) {
    if (
      bookedDatesArray &&
      bookedDatesArray.find((x) => x === moment(date).format("M/D/YYYY"))
    ) {
      return "highlighted";
    }
  }

  return (
    <div>
      {" "}
      <Calendar
        tileClassName={({ date, view }) => {
          return tilesClassName({ date, view });
        }}
        locale="et-EE"
      />
    </div>
  );
}

export default CalendarLogic;
