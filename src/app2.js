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

// function formatDay(forecastStamp) {
//   let date = new Date(forecastStamp * 1000);
//   let day = date.getDay();
//   let days = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
//   return days[day];
// }

function displayForecast(response) {
  console.log(response);
  // let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  // creating a string that will store the HTML content
  let forecastHTML = `<div class="row forecast-content">`;
  let days = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri."];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
                <div class="col-2 forecast-day bg-success">
                  ${day}
                  <img
                    class="forecast-icon"
                    src="/src/img/Icons/broken-clouds-night.svg"
                    alt=""
                    width="50"
                  />
                  <div class="forecast-temp">
                    <span class="forecast-temp-min">12</span>
                    <span class="forecast-temp-max">15</span>
                  </div>
                </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayWeatherDetails(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureMaxElement = document.querySelector("#temperature-max");
  let temperatureMinElement = document.querySelector("#temperature-min");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#main-weather-icon");

  cityElement.textContent = response.data.city;
  temperatureElement.textContent = Math.round(
    response.data.daily[0].temperature.day
  );
  temperatureMaxElement.textContent = Math.round(
    response.data.daily[0].temperature.maximum
  );
  temperatureMinElement.textContent = Math.round(
    response.data.daily[0].temperature.minimum
  );
  descriptionElement.textContent = response.data.daily[0].condition.description;
  iconElement.setAttribute(
    "src",
    `src/img/Icons/${response.data.daily[0].condition.icon}.svg`
  );
  console.log(response);
}

function getForecast(coordinates) {
  const lon = coordinates.longitude;
  const lat = coordinates.latitude;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=61obb83f649eaaft2919d1d4dfea50a5&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=61obb83f649eaaft2919d1d4dfea50a5&units=metric`;
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
displayForecast();
