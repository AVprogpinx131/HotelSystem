import React from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarLogic({ room }) {
  console.log("in CalendarLogic:", room);
  const bookedDatesArray = room ? (room.appointments || []) : [];

  function tilesClassName({ date, view }) {
    let found = bookedDatesArray.find(appointment => {
      console.log("comparing:", date, "to", appointment);
      if(date.valueOf() >= appointment.start && date.valueOf() <= appointment.end) {
        return true;
      }
    });

    return found ? "highlighted" : "";
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
