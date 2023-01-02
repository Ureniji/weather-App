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
function formatTime(time) {}

function displayWeatherDetails(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature_max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temperature_min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute("src", `src/img/Icons/${response.data.weather[0].icon}.svg`);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let dateElement = document.querySelector("#date").value;
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

searchCity("Jakarta");
