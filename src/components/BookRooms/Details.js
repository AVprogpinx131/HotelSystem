import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";

function Details() {
  const searchParams = new URLSearchParams(document.location.search);

  const param1 = searchParams.get("firstDate");
  const param2 = searchParams.get("secondDate");
  const param3 = searchParams.get("roomProperty");

  const milliseconds1 = param1 * 1000;
  const milliseconds2 = param2 * 1000;
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

  return (
    <div>
      <OtherPagesNavbar />
      <h1>Broneeri tuba</h1>
      <div className="calendar_container_1">
        <h3 className="room_type">Toa tüüp</h3>
        {param3}
        <h3 className="room_type time">Ajavahemik</h3>
        <div>{`Valitud vahemikus ${startDateString} kuni ${endDateString}`}</div>
        <button className="btn btn_2">Kinnita</button>
      </div>
    </div>
  );
}

export default Details;
