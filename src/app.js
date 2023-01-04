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
  let day = days[dayIndex];
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "Mai",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = date.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let month = months[monthIndex];
  let Date = date.getDate();
  return `<br>${hours} : ${minutes}
  </br> ${day}, ${month} ${Date}`;
}

function displayWeatherDetails(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureMaxElement = document.querySelector("#temperature_max");
  let temperatureMinElement = document.querySelector("#temperature_min");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

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
}
function searchCity(city) {
  let apiKey = "197ef3a642b76eef90e131866f74a0a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayTemperatureInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperatureMaxElement = document.querySelector("#temperature_max");
  let temperatureMinElement = document.querySelector("#temperature_min");
  celciusLink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = celciusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let fahrenheitTemperatureMax = celciusTemperatureMax * 1.8 + 32;
  temperatureMaxElement.innerHTML = Math.round(fahrenheitTemperatureMax);
  let fahrenheitTemperatureMin = celciusTemperatureMin * 1.8 + 32;
  temperatureMinElement.innerHTML = Math.round(fahrenheitTemperatureMin);
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

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayTemperatureInCelcius);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayTemperatureInFahrenheit);

searchCity("Jakarta");
