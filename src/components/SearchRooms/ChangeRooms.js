import React, { useState, useEffect } from "react";
import OtherPagesNavbar from "../Navbars/OtherPagesNavbar";
import { getRoomsSortedBy } from "../HotelApi";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ChangeRooms() {
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);

  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();

  const fetchRoom = async () => {
    const res = (await getRoomsSortedBy()).find(
      (element) => element.id === roomId
    );
    const { pictures } = res;
    setRooms({ pictures });
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const removeImg = (index) => {
    if (rooms.pictures.length > 1) {
      const newImg = [...rooms.pictures].filter((_, i) => i !== index);
      setRooms({ pictures: newImg });
    } else {
      alert("Ainult üks tuba on alles, seega ei saa kustutada.");
    }
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
        {rooms.pictures &&
          rooms.pictures.map((image, index) => {
            return (
              <div key={image} className="inner_images">
                <div className="buttons">
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
          <input type="text" className="input" />
        </div>
        <div>
          <label className="label">Hind</label>
          <input type="number" className="input" />
        </div>
        <div>
          <label className="label">Tubade arv</label>
          <input type="number" className="input" />
        </div>
      </div>
      <div className="box box_1">
        <div>
          <label className="label">Kirjeldus</label>
          <div>
            <textarea cols="33" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeRooms;
