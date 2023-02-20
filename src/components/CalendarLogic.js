import React from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarLogic({ room }) {
  console.log("in CalendarLogic:", room);

  function tilesClassName({ date, view }) {
    const bookedDatesArray = room ? (room.appointments ? room.appointments : []) : [];
    console.log("bookedDatesArray:", bookedDatesArray);

    let found = bookedDatesArray.find(appointment => {
      console.log("comparing:", date, "to", appointment);
      console.log("typeof date:", typeof date);
      console.log("typeof start:", typeof appointment[0]);
      console.log("typeof end:", typeof appointment[1]);
      if(date >= appointment[0] && date <= appointment[1]) {
        console.log("true");
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
