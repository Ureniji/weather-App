function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  let monthIndex = date.getMonth();
  let months = [
    "Jan.",
    "Feb.",
    "Mär.",
    "Apr.",
    "Mai",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Okt.",
    "Nov.",
    "Dez.",
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

// clock isn't running a full circle after seconds reach 59 with window.requestAnimationFrame
//  -> Reason behind this is:
// function update(time) {
//   console.log(time);
//   const currentTime = new Date();
//   const hr = currentTime.getHours();
//   const min = currentTime.getMinutes();
//   const sec = currentTime.getSeconds();

//   if (hr < 10) hr = `0${hr}`;
//   if (min < 10) min = `0${min}`;
//   if (sec < 10) sec = `0${sec}`;
//   hours.textContent = hr;
//   minutes.textContent = min;
//   seconds.textContent = sec;
//   window.requestAnimationFrame(update);
// }
// window.requestAnimationFrame(update);

function displayWeatherDetails(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureMaxElement = document.querySelector("#temperature-max");
  let temperatureMinElement = document.querySelector("#temperature-min");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#main-weather-icon");

  cityElement.textContent = response.data.name;
  temperatureElement.textContent = `${Math.round(response.data.main.temp)}°`;
  temperatureMaxElement.textContent = ` ${Math.round(
    response.data.main.temp_max
  )}°`;
  temperatureMinElement.textContent = `${Math.round(
    response.data.main.temp_min
  )}°`;
  descriptionElement.textContent = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `src/img/Icons/${response.data.weather[0].icon}.svg`
  );
  console.log(response);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de&appid=aa09763d916df0424c840d55bfc2d2c9&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function getForecast(response) {
  console.log(response);
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=de&appid=21a61edab25ec99fdc0f38dd9a3013d7&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// function displayForecast(response) {
//   console.log(response.data);
//   let forecast = response.data.daily;
//   let forecastElement = document.querySelector("#forecast");

//   let forecastHTML = `<div class="forecast" id="forecast">`;
//   forecast.forEach(function (forecastDAy,index){
//     for (let index = +1; index++) return index;
//     if (index >= 1 && undex <7) {
//       forecastHTML +=
//     }
//   })
//               `<div class="container dropdown">
//                 <div><div class="forecast-day"></div></div>
//               </div>
//             </div>`;
// }

// // creating a global variable
// // its empty in the beginning, but after it gets a response from the API
// let celciusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", handleSubmit);

let hours = document.querySelector("#hours");
let minutes = document.querySelector("#minutes");
let seconds = document.querySelector("#seconds");

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.textContent = formatDate(currentTime);

searchCity("berlin");
