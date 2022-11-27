const prefix = ''

/***
 * @typedef {Object} Room
 * @property {String} name Type of room
 * @property {number} price Price per night
 * @property {number} available Available room count
 * @property {String[]} pictures Array of URL-s of pictures. First one is the thumbnail.
 */

/***
 * @returns {Room[]}
 */
async function getRooms() {
    return (await fetch(prefix + '/api/rooms')).json();
}

/***
 * @param {('name' | 'price' | 'available')} column
 * @param {boolean} isAscending
 * @returns {Room[]}
 */
async function getRoomsSortedBy(column, isAscending) {
  return (await fetch(prefix + '/api/rooms-sorted?' + new URLSearchParams({
      column, isAscending
    }))).json();
}

/***
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Room[]}
 */
async function getRoomsByAvailability(startDate, endDate) {
  return (await fetch(prefix + '/api/rooms-available?' + new URLSearchParams({
      startDate, endDate
    }))).json();
}

export { getRooms };
