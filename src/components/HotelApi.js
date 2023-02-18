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
        obj["appointments"] = obj["appointments"].map(appointment => [
          new Date(...appointment[0].split("-")),
          new Date(...appointment[1].split("-"))
        ]);
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
        obj["appointments"] = obj["appointments"].map(appointment => [
          new Date(...appointment[0].split("-")),
          new Date(...appointment[1].split("-"))
        ]);
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
        obj["appointments"] = obj["appointments"].map(appointment => [
          new Date(...appointment[0].split("-")),
          new Date(...appointment[1].split("-"))
        ]);
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

export { getRooms, getRoomsSortedBy, getRoomsByAvailability, logIn, register, getUser, getRoom };
