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
  let day = days[dayIndex];
  let monthIndex = date.getMonth();
  let months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let month = months[monthIndex];
  let Date = date.getDate();
  return `<br><strong>${hours} : ${minutes}</strong>
  </br><small>${day}, ${month} ${Date}</small>`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "21a61edab25ec99fdc0f38dd9a3013d7";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=de&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(forecastStamp) {
  let date = new Date(forecastStamp * 1000); // warum mussten wir hier *1000 rechnen?
  let day = date.getDay();
  let days = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="container dropdown p-0"><div class="row mx-auto">`; // storing the HTML content
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index < 7) {
      forecastHTML += `
    <div class="col-2 p-1 text-center">
        <div class="forecast-day border-right border-left">${formatDay(
          forecastDay.dt
        )}</div>
           <img
            src="src/img/Icons/${forecastDay.weather[0].icon}.svg"
            alt="forecast-icon"
            style="height: 60px;
            width: 60px;"
            class="forecast-icon img-fluid"/>
             <div class="row">
             <div class="col-1">
              <span class="forecastTemperatureMax">${Math.round(
                forecastDay.temp.max
              )}
                
             </div>
             <div class="col-1">
             <span class="forecastTemperatureMin opacity-50">${Math.round(
               forecastDay.temp.min
             )}°</span>
             </div>
             </div>
          </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherDetails(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureMaxElement = document.querySelector("#temperature_max");
  let temperatureMinElement = document.querySelector("#temperature_min");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityElement = response.data.current;
  celciusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  celciusTemperatureMax = response.data.main.temp_max;
  temperatureMaxElement.innerHTML = Math.round(celciusTemperatureMax);
  celciusTemperatureMin = response.data.main.temp_min;
  temperatureMinElement.innerHTML = Math.round(celciusTemperatureMin);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `src/img/Icons/${response.data.weather[0].icon}.svg`
  );
  console.log(response);
  getForecast(response.data.coord);
}

function searchCity(city) {
  console.log(response);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de&appid=aa09763d916df0424c840d55bfc2d2c9&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayTemperatureInCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let temperatureMaxElement = document.querySelector("#temperature_max");
  temperatureMaxElement.innerHTML = Math.round(celciusTemperatureMax);
  let temperatureMinElement = document.querySelector("#temperature_min");
  temperatureMinElement.innerHTML = Math.round(celciusTemperatureMin);
}

let celciusTemperature = null;
let celciusTemperatureMax = null;
let celciusTemperatureMin = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

searchCity("berlin");
