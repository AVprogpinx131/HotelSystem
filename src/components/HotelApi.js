const prefix = 'http://127.0.0.1:4000';

/**
 * @typedef {Object} Appointment
 * @property {Date} start Start datetime of appointment
 * @property {Date} end End datetime of appointment
 */

/***
 * @typedef {Object} Room
 * @property {number} id
 * @property {String} name Type of room
 * @property {number} price Price per night
 * @property {number} available Available room count
 * @property {Appointment[] | null} appointments Appointments
 * @property {String[]} pictures Array of URL-s of pictures. First one is the thumbnail.
 * @property {number} count Count of this room in the hotel
 */

/**
 * @type {{ [key: number]: Room }}
 */
let fetchedRooms = {};

/**
 * Update room data if anything has changed
 * @param {Room[]} rooms Rooms fetched, order doesn't matter
 */
function updateFetchedRooms(rooms) {
  rooms.forEach(room => {
    fetchedRooms[room.id] = room;
  });
}

/***
 * @returns {Promise<Room | null>}
 */
async function getRoom(id) {
  console.log("getting room:", id);
  if(!id) return null;
  if(typeof id === "number") id = ""+id;

  if(!(id in Object.keys(fetchedRooms))) {
    let data = await getRooms();
    console.log("got rooms:", data);

    if(!id in Object.keys(fetchedRooms)) {
      return null;
    }
  }

  console.log("fetched rooms:", fetchedRooms);
  console.log("returning:", fetchedRooms[id]);
  return fetchedRooms[id];
}

/***
 * @returns {Promise<Room[]>}
 */
async function getRooms() {
  try {
    const response = await fetch(prefix+'/api/rooms', { credentials: 'include' });
    const data = await response.json();
    data.forEach(obj => {
      if(obj["appointments"] != null) {
        obj["appointments"] = JSON.parse(obj["appointments"]);
        obj["appointments"] = obj["appointments"].map(appointment => {
          let date1 = appointment[0].split("-");
          date1[1] = parseInt(date1[1]) - 0;
          let date2 = appointment[1].split("-");
          date2[1] = parseInt(date2[1]) - 0;
          
          return [
            new Date(date1),
            new Date(date2)
          ];
        });
      }
      if(obj["pictures"] != null) obj["pictures"] = JSON.parse(obj["pictures"])
    })
    console.log(JSON.stringify(data, null, 4));
    updateFetchedRooms(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

/***
 * @param {('name' | 'price' | 'available')} column
 * @param {boolean} isAscending
 * @returns {Promise<Room[]>}
 */
async function getRoomsSortedBy(column, isAscending) {
  try {
    const response = await fetch(prefix+'/api/rooms-sorted?' + new URLSearchParams({
      column,
      isAscending,
    }), { credentials: 'include' });
    const data = await response.json();
    data.forEach(obj => {
      if(obj["appointments"] != null) {
        obj["appointments"] = JSON.parse(obj["appointments"]);
        obj["appointments"] = obj["appointments"].map(appointment => {
          let date1 = appointment[0].split("-");
          date1[1] = parseInt(date1[1]) - 0;
          let date2 = appointment[1].split("-");
          date2[1] = parseInt(date2[1]) - 0;
          
          return [
            new Date(date1),
            new Date(date2)
          ];
        });
      }
      if(obj["pictures"] != null) obj["pictures"] = JSON.parse(obj["pictures"])
    })
    console.log(JSON.stringify(data, null, 4));
    updateFetchedRooms(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

/***
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise<Room[]>}
 */
async function getRoomsByAvailability(startDate, endDate) {
  try {
    const response = await fetch(prefix+'/api/rooms-available?' + new URLSearchParams({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }), { credentials: 'include' });
    const data = await response.json();
    data.forEach(obj => {
      if(obj["appointments"] != null) {
        obj["appointments"] = JSON.parse(obj["appointments"]);
        obj["appointments"] = obj["appointments"].map(appointment => {
          let date1 = appointment[0].split("-");
          date1[1] = parseInt(date1[1]) - 0;
          let date2 = appointment[1].split("-");
          date2[1] = parseInt(date2[1]) - 0;
          
          return [
            new Date(date1),
            new Date(date2)
          ];
        });
      }
      if(obj["pictures"] != null) obj["pictures"] = JSON.parse(obj["pictures"])
    })
    console.log(JSON.stringify(data, null, 4));
    updateFetchedRooms(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function makeAppointment(room, startDate, endDate) {
  console.log("startDate:", startDate.toISOString());
  console.log("endDate:", endDate.toISOString());
  try {
    const response = await fetch(prefix+'/api/make-appointment?' + new URLSearchParams({
      room,
      startDate: startDate.getFullYear()+"-"+(startDate.getMonth() + 1)+"-"+startDate.getDate(),
      endDate: endDate.getFullYear()+"-"+(endDate.getMonth() + 1)+"-"+endDate.getDate()
    }), { method: 'POST', credentials: 'include' });
    return response.status;
  } catch(error) {
    console.error(error);
  }
}

async function updateRoom(room, name, price, count, description, pictures) {
  console.log("updateRoom:", name, price, count, description, pictures);
  try {
    const response = await fetch(prefix+'/api/update?' + new URLSearchParams({
      room
    }), { body: JSON.stringify({
      name,
      price,
      count,
      description,
      pictures
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, method: 'POST', credentials: 'include' });
    if(response.status == 200) fetchedRooms[""+room] = {
      ...fetchedRooms[""+room],
      name,
      price,
      count,
      description,
      pictures
    };
    return response.status;
  } catch(error) {
    console.error(error);
  }
}

async function logIn(username, password) {
  const response = await fetch(prefix+'/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username, password
    }),
    credentials: 'include'
  });
  const user = await response.json();

  return user;
}

async function register(username, password, firstname, lastname) {
  const response = await fetch(prefix+'/api/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username, firstname, lastname, password
    }),
    credentials: 'include'
  });
  const user = await response.json();

  return user;
}

async function getUser() {
  const response = await fetch(prefix+'/api/user', { credentials: 'include' });
  if(response.status != 200) return null;
  const user = await response.json();

  return user;
}

export { getRooms, getRoomsSortedBy, getRoomsByAvailability, logIn, register, getUser, getRoom, makeAppointment, updateRoom };



