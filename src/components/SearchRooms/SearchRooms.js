import React, { useState, useEffect } from "react";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { getRoomsSortedBy } from "../HotelApi";
import RoomCard from "../SearchRooms/RoomCard";

function SearchRooms() {
  const [rooms, setRooms] = useState([]);
  const [sortDirection, setSortDirection] = useState(true);
  const [sortType, setSortType] = useState("price");

  useEffect(() => {
    getRoomsSortedBy(sortType, sortDirection).then(data => setRooms(data));
  }, [sortType, sortDirection]);

  const handleDirection = () => {
    setSortDirection(!sortDirection);
  };

  console.log("rendering rooms:", rooms);

  return (
    <div>
      <OtherPagesNavbar />
      <div className="search_elements">
        <h1>Sirvi tube</h1>
        <div className="categories">
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="name">Toa tüüp</option>
            <option value="available">Saadavus</option>
            <option value="price">Hind</option>
          </select>
          <select id="space" onChange={handleDirection}>
            <option>Kasvav</option>
            <option>Kahanev</option>
          </select>
        </div>
      </div>
      {rooms && rooms.map((room) => {
        return (
          <div key={room.id}>
            <RoomCard room={room} />
          </div>
        );
      })}
    </div>
  );
}

export default SearchRooms;
