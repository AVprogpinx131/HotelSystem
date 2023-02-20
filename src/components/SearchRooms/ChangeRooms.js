import React, { useState, useEffect } from "react";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { getRoom, getRoomsSortedBy, updateRoom } from "../HotelApi";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ChangeRooms() {
  const { roomId } = useParams();
  const [ room, setRoom ] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getRoom(roomId).then(room => setRoom(room));
  }, [ roomId ]);

  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();

  const removeImg = (index) => {
    if (room.pictures.length > 1) {
      const newImg = [...room.pictures].filter((_, i) => i !== index);
      setRoom({ ...room, pictures: newImg });
    }
  };

  const save = () => {
    console.log("room:", room);
    updateRoom(roomId, room.name, room.price, room.count, room.description, room.pictures).then(() => {
      history('/room-overview/'+roomId);
    });
  };

  // rendering previews
  useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);

  return (
    <div>
      <OtherPagesNavbar />
      <div className="outer_images">
        {room && room.pictures &&
          room.pictures.map((image, index) => {
            return (
              <div key={image} className="inner_images">
                <div className="buttons">
                  {
                    room.pictures.length > 1 ? (
                      <MdDelete
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          marginRight: ".5em",
                        }}
                        className="delete-btn"
                        onClick={() => removeImg(index)}
                      />
                    ) : null
                  }
                </div>
                <div>
                  <img src={image} alt="" className="image" />
                </div>
              </div>
            );
          })}
          <label className="label_1">
            Lisa pilte
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFiles(e.target.files);
                }
              }}
              className="add-btn"
            />
          </label>
      </div>
      <div className="outer_images">
        {previews &&
          previews.map((image) => {
            return (
              <div className="inner_images">
                <div className="buttons">
                  <MdDelete
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      marginRight: ".5em",
                    }}
                    className="delete-btn"
                    onClick={() =>
                      setPreviews(previews.filter((e) => e !== image))
                    }
                  />
                  <label className="label_1">
                    Lisa pilte
                    <input
                      type="file"
                      accept="image/jpg, image/jpeg, image/png"
                      multiple
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFiles(e.target.files);
                        }
                      }}
                      className="add-btn"
                    />
                  </label>
                </div>
                <div>
                  <img src={image} alt="" className="image" />
                </div>
              </div>
            );
          })}
      </div>
      <div className="box">
        <div>
          <label className="label">Toa tüüp</label>
          <input type="text" className="input" value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })} />
        </div>
        <div>
          <label className="label">Hind</label>
          <input type="number" className="input" value={room.price} onChange={(e) => setRoom({ ...room, price: e.target.value })} />
        </div>
        <div>
          <label className="label">Tubade arv</label>
          <input type="number" className="input" value={room.count} onChange={(e) => setRoom({ ...room, count: e.target.value })} />
        </div>
      </div>
      <div className="box box_1">
        <div>
          <label className="label">Kirjeldus</label>
          <div>
            <textarea cols="33" value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })} />
          </div>
        </div>
      </div>
      <button onClick={() => save()}>Salvesta</button>
    </div>
  );
}

export default ChangeRooms;
