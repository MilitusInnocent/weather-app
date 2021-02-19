const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', (req, res) => {
  res.render('index', {
    lat: null,
    lon: null,
    date: null,
    des: null,
    icon: null,
    temp: null,
    humidity: null,
    wind_speed: null
  });
});

router.post('/', async (req, res) =>{
  const lat = req.body.lat;
  const lon = req.body.lon;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`;

  try {
    await fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.message=== 'lat not found'||data.message=== 'lon not found'){
      res.render('index', {
        lat: data.message,
        lon: data.message,
        date: new Date().toLocaleDateString(),
        des: null,
        icon: null,
        temp: null,
        humidity: null,
        wind_speed: null
      })
    } else{
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const date = new Date().toLocaleDateString();
      const des = data.weather[0].description;
      const icon = data.weather[0].icon;
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind_speed = data.wind.speed;

      res.render('index', {
        lat, lon, date, des, icon, temp, humidity, wind_speed
      });
    };
  });
  } catch(err) {
    res.render('index', {
      lat: "This probably isn't what you expect to get, look and go again",
      lon: null,
      date: null,
      des: null,
      icon: null,
      temp: null,
      humidity: null,
      wind_speed: null
    })

  }
});
// router.post('/', async (req, res) => {
//   const city = req.body.city;
//   const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

//   try {
//     await fetch(url_api)
//       .then(res => res.json())
//       .then(data => {
//         if (data.message === 'city not found') {
//           res.render('index', {
//             city: data.message,
//             des: null,
//             icon: null,
//             temp: null
//           })
//         } else {
//           const city = data.name;
//           const des = data.weather[0].description;
//           const icon = data.weather[0].icon;
//           const temp = data.main.temp;

//           res.render('index', {
//             city, des, icon, temp
//           });
//         }
//       });

//   } catch (err) {
//     res.render('index', {
//       city: 'something wrong',
//       des: null,
//       icon: null,
//       temp: null
//     })
//   }

// })


module.exports = router;