function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "Februar",
    "March",
    "April",
    "Mai",
    "June",
    "July",
    "August",
    "September.",
    "October",
    "November",
    "December",
  ];
  let month = months[monthIndex];
  let day = days[dayIndex];
  let Date = date.getDate();
  let year = date.getFullYear();
  return `${day}, ${Date} ${month} ${year} `;
}

const clock = setInterval(function now() {
  let currentTime = new Date();
  let hr = currentTime.getHours();
  if (hr < 10) hr = `0${hr}`;

  let min = currentTime.getMinutes();
  if (min < 10) min = `0${min}`;

  let sec = currentTime.getSeconds();
  if (sec < 10) sec = `0${sec}`;
  hours.textContent = hr;
  minutes.textContent = min;
  seconds.textContent = sec;
}, 1000);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast-content">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 7)
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2 forecast-day">
                   <div class="forecast-day-font">${formatDay(
                     forecastDay.time
                   )}</div>
                  <img
                    class="forecast-icon"
                    src="/src/img/Icons/${forecastDay.condition.icon}.svg"
                    alt=""
                  />
                  <div class="forecast-temp">
                    <span class="forecast-temp-min">${Math.round(
                      forecastDay.temperature.minimum
                    )}</span>
                    <span class="forecast-temp-max">${Math.round(
                      forecastDay.temperature.maximum
                    )}</span>
                  </div>
                </div>
              `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// current;
// minutely;
// hourly;
// daily;
// alerts;
function getForecast(coordinates) {
  // let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}lon=${coordinates.lon}&exclude=minutely,hourly,daily,alerts&appid=aa09763d916df0424c840d55bfc2d2c9&units=metric`;
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=61obb83f649eaaft2919d1d4dfea50a5&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherDetails(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  // let temperatureMaxElement = document.querySelector("#temperature-max");
  // let temperatureMinElement = document.querySelector("#temperature-min");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#main-weather-icon");

  cityElement.textContent = response.data.city;
  temperatureElement.textContent =
    Math.round(response.data.temperature.current) + `°`;
  descriptionElement.textContent = response.data.condition.description;
  iconElement.setAttribute(
    "src",
    `src/img/Icons/${response.data.condition.icon}.svg`
  );
  // commented out for now, since API doesnt have min and max for city yet, placnning to include this later

  // temperatureMaxElement.textContent =
  //   Math.round(response.data.main.temp_max) + `°`;
  // temperatureMinElement.textContent =
  //   Math.round(response.data.main.temp_min) + `°`;

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=61obb83f649eaaft2919d1d4dfea50a5&units=metric`;
  // let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=aa09763d916df0424c840d55bfc2d2c9&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", handleSubmit);

let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.textContent = formatDate(currentTime);

searchCity("berlin");
