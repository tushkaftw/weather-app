"use strict";
// variables
const addBtn = document.querySelector("#add-btn");
const currentTemp = document.querySelector("#current-temp");
const currentLocation = document.querySelector("#current-location");
const currentStatus = document.querySelector("#current-status");
const days = [
  document.querySelector(".day-0"),
  document.querySelector(".day-1"),
  document.querySelector(".day-2"),
  document.querySelector(".day-3"),
  document.querySelector(".day-4"),
];
const daysNames = [
  document.querySelector(".day-0-name"),
  document.querySelector(".day-1-name"),
  document.querySelector(".day-2-name"),
  document.querySelector(".day-3-name"),
  document.querySelector(".day-4-name"),
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let locationValue;
let lat = 0;
let lon = 0;

const api = {
  url: `https://api.openweathermap.org/data/2.5/weather?q=`,
  key: `d9585685aab8ff2df179f82aa618ff5c`,
  oneCallUrl: `https://api.openweathermap.org/data/2.5/onecall?`,
};

// event listeners
addBtn.addEventListener("click", addLocation);
fetchWeather(document.cookie ? document.cookie : "London");

// functions
function addLocation() {
  locationValue = prompt(`Please add location:`);
  fetchWeather(locationValue);
}

function fetchWeather(location) {
  fetch(`${api.url}${location}&appid=${api.key}&units=metric`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      currentTemp.innerHTML = `${response.main.temp.toFixed(1)}<span>°c</span>`;
      currentLocation.textContent = `${response.name}, ${response.sys.country}`;
      currentStatus.textContent = response.weather[0].main;
      document.cookie = response.name;
      lat = response.coord.lat;
      lon = response.coord.lon;
      fetch(
        `${api.oneCallUrl}lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${api.key}&units=metric`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          for (let i = 0; i <= 4; i++) {
            days[i].textContent = `${response.daily[i + 1].temp.day.toFixed(
              1
            )} °c`;

            daysNames[i].textContent =
              weekDays[new Date(response.daily[i + 1].dt * 1000).getDay()];
          }
        });
    })
    .catch((error) => {
      alert(`There has been an error! Please try again!`);
    });
}
