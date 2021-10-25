// display the local time from the API
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

// display the temperature, city and other parameters from the API
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemperature");
  let cityElement = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#currentDescription");
  let feelElement = document.querySelector("#currentFeel");
  let humidityElement = document.querySelector("#currentHumidity");
  let windElement = document.querySelector("#currentWind");
  let dateElement = document.querySelector("#currentDate");
  let iconElement = document.querySelector("#currentIcon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// API call
let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
let city = "Amsterdam";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
