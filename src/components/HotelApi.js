function randomDate(date1, date2) {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  date1 = date1 || "01-01-1970";
  date2 = date2 || new Date().toLocaleDateString();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();

  if (date1 > date2) {
    return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
  } else {
    return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
  }
}

function uniq(a) {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

/**
 * @returns {Date[]}
 */
function generateRandomDates() {
  let dates = [];

  let currentDate = new Date(),
    y = currentDate.getFullYear(),
    m = currentDate.getMonth();
  let firstDayInMonth = new Date(y, m, 1);
  let lastDayInMonth = new Date(y, m + 1, 0);

  for (let i = 0; i < 10; i++)
    dates.push(randomDate(firstDayInMonth, lastDayInMonth));

  return uniq(dates);
}

function generateRandomDatesExcluding(
  excludeRangeStartDate,
  excludeRangeEndDate
) {
  return generateRandomDates().filter((date) => {
    let newDate = new Date(date);
    return newDate < excludeRangeStartDate || newDate > excludeRangeEndDate;
  });
}

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
  return await [
    {
      id: "1",
      name: "Ühekohaline",
      available: 4,
      price: 40,
      pictures: [
        "https://images.trvl-media.com/lodging/75000000/74250000/74242600/74242531/9b2b2d66.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/5a476c74.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/9c4ce050.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "2",
      name: "Kahekohaline",
      available: 5,
      price: 75,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/1436d39c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/bf3c0cbc.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/79035584.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "3",
      name: "Kahe voodiga",
      available: 3,
      price: 80,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/83c80c39.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/917201ab.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/c43c9335.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "4",
      name: "Kolmekohaline",
      available: 3,
      price: 100,
      pictures: [
        "https://images.trvl-media.com/lodging/75000000/74250000/74242600/74242531/1331f409.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/42361b97.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/11995beb.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "5",
      name: "Sviit",
      available: 1,
      price: 150,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/9f0abbf8.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/bcb18a26.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/5dfe5424.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/f5bad581.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
  ];
}

/***
 * @param {('name' | 'price' | 'available')} column
 * @param {boolean} isAscending
 * @returns {Room[]}
 */
async function getRoomsSortedBy(column, isAscending) {
  return await [
    {
      id: "1",
      name: "Ühekohaline",
      available: 4,
      price: 40,
      pictures: [
        "https://images.trvl-media.com/lodging/75000000/74250000/74242600/74242531/9b2b2d66.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/5a476c74.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/9c4ce050.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "2",
      name: "Kahekohaline",
      available: 5,
      price: 75,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/1436d39c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/bf3c0cbc.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/79035584.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "3",
      name: "Kahe voodiga",
      available: 3,
      price: 80,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/83c80c39.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/917201ab.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/c43c9335.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "4",
      name: "Kolmekohaline",
      available: 3,
      price: 100,
      pictures: [
        "https://images.trvl-media.com/lodging/75000000/74250000/74242600/74242531/1331f409.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/42361b97.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/11995beb.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
    {
      id: "5",
      name: "Sviit",
      available: 1,
      price: 150,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/9f0abbf8.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/bcb18a26.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/5dfe5424.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/f5bad581.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDates(),
    },
  ].sort((roomA, roomB) => {
    if (roomA[column] < roomB[column]) return isAscending ? -1 : 1;
    if (roomA[column] > roomB[column]) return isAscending ? 1 : -1;
    return 0;
  });
}

/***
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Room[]}
 */
async function getRoomsByAvailability(startDate, endDate) {
  return await [
    {
      name: "Ühekohaline",
      available: Math.floor(Math.random() * 7),
      price: 40,
      pictures: [
        "https://images.trvl-media.com/lodging/75000000/74250000/74242600/74242531/9b2b2d66.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/5a476c74.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/9c4ce050.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDatesExcluding(startDate, endDate),
    },
    {
      name: "Kahekohaline",
      available: Math.floor(Math.random() * 7),
      price: 75,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/1436d39c.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/bf3c0cbc.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/79035584.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDatesExcluding(startDate, endDate),
    },
    {
      name: "Kahe voodiga",
      available: Math.floor(Math.random() * 5),
      price: 80,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/83c80c39.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/917201ab.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/c43c9335.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDatesExcluding(startDate, endDate),
    },
    {
      name: "Kolmekohaline",
      available: Math.floor(Math.random() * 5),
      price: 100,
      pictures: [
        "https://images.trvl-media.com/lodging/75000000/74250000/74242600/74242531/1331f409.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/42361b97.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/11995beb.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDatesExcluding(startDate, endDate),
    },
    {
      name: "Sviit",
      available: Math.floor(Math.random() * 2),
      price: 150,
      pictures: [
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/9f0abbf8.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/bcb18a26.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/5dfe5424.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        "https://images.trvl-media.com/hotels/75000000/74250000/74242600/74242531/f5bad581.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
      ],
      bookedDates: generateRandomDatesExcluding(startDate, endDate),
    },
  ];
}

export { getRooms, getRoomsSortedBy, getRoomsByAvailability };
