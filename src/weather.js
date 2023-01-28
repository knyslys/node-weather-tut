// 87b91ca1548cdd444232ff1f5b1850a7
//GEOCODING API
// 5b98e74e0074cdcd1b9f54b3f04ecad7
// http://api.positionstack.com/v1/forward?access_key=5b98e74e0074cdcd1b9f54b3f04ecad7&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC
// {
//   request: {
//     type: 'City',
//     query: 'Vilnius, Lithuania',
//     language: 'en',
//     unit: 'm'
//   },
//   location: {
//     name: 'Vilnius',
//     country: 'Lithuania',
//     region: 'Vilniaus Apskritis',
//     lat: '54.683',
//     lon: '25.317',
//     timezone_id: 'Europe/Vilnius',
//     localtime: '2023-01-20 15:22',
//     localtime_epoch: 1674228120,
//     utc_offset: '2.0'
//   },
//   current: {
//     observation_time: '01:22 PM',
//     temperature: 1,
//     weather_code: 122,
//     weather_icons: [
//       'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
//     ],
//     weather_descriptions: [ 'Overcast' ],
//     wind_speed: 15,
//     wind_degree: 356,
//     wind_dir: 'N',
//     pressure: 1016,
//     precip: 0,
//     humidity: 87,
//     cloudcover: 100,
//     feelslike: -3,
//     uv_index: 1,
//     visibility: 10,
//     is_day: 'yes'
//   }
// }

// {
//   data: [
//     {
//       latitude: 54.749494,
//       longitude: 23.49556,
//       type: 'locality',
//       name: 'Kazlų Rūda',
//       number: null,
//       postal_code: null,
//       street: null,
//       confidence: 1,
//       region: 'Marijampole',
//       region_code: 'MA',
//       county: 'Kazlu Ruda',
//       locality: 'Kazlų Rūda',
//       administrative_area: null,
//       neighbourhood: null,
//       country: 'Lithuania',
//       country_code: 'LTU',
//       continent: 'Europe',
//       label: 'Kazlų Rūda, MA, Lithuania'
//     }
//   ]
// }
// const cityAPI =
//   "http://api.positionstack.com/v1/forward?access_key=5b98e74e0074cdcd1b9f54b3f04ecad7&query=kazlu ruda";

// const weatherAPI =
//   "http://api.weatherstack.com/current?access_key=87b91ca1548cdd444232ff1f5b1850a7&query=Vilnius&units=m";

const requestWeather = async (lat, lon) => {
  const url = `http://api.weatherstack.com/current?access_key=87b91ca1548cdd444232ff1f5b1850a7&query=${lat},${lon}`;
  try {
    const weather = await fetch(url);
    const weatherObj = await weather.json();
    return weatherObj;
  } catch (e) {
    console.log("nepavyko");
  }
};

const geocode = async (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=5b98e74e0074cdcd1b9f54b3f04ecad7&query=${address}`;
  try {
    const city = await fetch(url);
    const cityJSON = await city.json();
    const latlon = [cityJSON.data[0].latitude, cityJSON.data[0].longitude];
    const weatherObj = await requestWeather(latlon[0], latlon[1]);
    callback(undefined, weatherObj);
  } catch (er) {
    callback("Something went wrong: " + er.message, undefined);
  }
};

// geocode(cityName, (error, response) => {
//   if (error) {
//     console.log(error);
//     return 0;
//   }
//   requestWeather(response[0], response[1]);
// });

const tests = {
  label: "Vakaris",
  age: 10,
  nationality: "Lithuania",
};

const testF = ({ label, age, nationality } = {}) => {
  console.log(label);
  console.log(age);
  console.log(nationality);
};
testF(tests);

module.exports = { geocode };
