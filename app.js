const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const axios = require("axios");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

const getTemp = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.main.temp;
};

const getHumidity = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.main.humidity;
};

const getFeelsLike = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.main.feels_like;
};

const getName = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.name;
};

const getCountry = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.sys.country;
};

const getWind = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.wind.speed;
};

const getWeather = async (cityName) => {
  const getValue = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&mode=json&units=metric&appid=cb02915bb92f05b586b8c59d3d49b906`
  );
  return getValue.data.weather[0].description;
};

app.get("/", async (req, res) => {
  const tempvar = await getTemp("paris");
  const humidvar = await getHumidity("paris");
  const feelslikevar = await getFeelsLike("paris");
  const namevar = await getName("paris");
  const countryvar = await getCountry("paris");
  const windvar = await getWind("paris");
  const weathervar = await getWeather("paris");
  let date_ob = new Date();
  let currdate = ("0" + date_ob.getDate()).slice(-2);
  let currweekday = date_ob.toLocaleString("default", { weekday: "long" });
  let currmonth = date_ob.toLocaleString("default", { month: "short" });
  let curryear = date_ob.getFullYear();
  res.render("./home.ejs", {
    temprature: tempvar,
    humidity: humidvar,
    feelslike: feelslikevar,
    name: namevar,
    country: countryvar,
    wind: windvar,
    weather: weathervar,
    date: currdate,
    weekday: currweekday,
    month: currmonth,
    year: curryear,
  });
});

app.post("/getData", async (req, res) => {
  const { query } = req.body;
  const tempvar = await getTemp(query);
  const humidvar = await getHumidity(query);
  const feelslikevar = await getFeelsLike(query);
  const namevar = await getName(query);
  const countryvar = await getCountry(query);
  const windvar = await getWind(query);
  const weathervar = await getWeather(query);
  let date_ob = new Date();
  let currdate = ("0" + date_ob.getDate()).slice(-2);
  let currweekday = date_ob.toLocaleString("default", { weekday: "long" });
  let currmonth = date_ob.toLocaleString("default", { month: "short" });
  let curryear = date_ob.getFullYear();
  res.render("./home.ejs", {
    temprature: tempvar,
    humidity: humidvar,
    feelslike: feelslikevar,
    name: namevar,
    country: countryvar,
    wind: windvar,
    weather: weathervar,
    date: currdate,
    weekday: currweekday,
    month: currmonth,
    year: curryear,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
