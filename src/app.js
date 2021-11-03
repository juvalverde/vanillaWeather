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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// display forecast days
function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  // let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 days">
        <div class="weatherForecastDay">${formatForecastDay(
          forecastDay.dt
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="40px"
        />
        <div class="weatherForecastTemperature">
          <span class="maxTemp">${Math.round(forecastDay.temp.max)}º</span> |
          <span class="minTemp">${Math.round(forecastDay.temp.min)}º</span>
        </div>
        <div class="weatherForecastDescription">Sunny</div>
      </div>
    
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

// handles the display of temperature, city, humidity and other parameters from the API
function displayTemperature(response) {
  // console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemperature");
  let cityElement = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#currentDescription");
  let feelElement = document.querySelector("#currentFeel");
  let humidityElement = document.querySelector("#currentHumidity");
  let windElement = document.querySelector("#currentWind");
  let dateElement = document.querySelector("#currentDate");
  let iconElement = document.querySelector("#currentIcon");

  celciusTemperature = Math.round(response.data.main.temp);

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

  getForecast(response.data.coord);
}

// search engine function
function search(city) {
  // API call
  let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

// handles the submit action
function submitAction(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

// function showFahrenheitTemperature(event) {
//   event.preventDefault();

//   let temperatureElement = document.querySelector("#currentTemperature");
//   celciusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
//   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// function showCelciusTemperature(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#currentTemperature");
//   fahrenheitLink.classList.remove("active");
//   celciusLink.classList.add("active");
//   temperatureElement.innerHTML = celciusTemperature;
// }

// let celciusTemperature = null;

// search engine
let form = document.querySelector("#serachForm");
form.addEventListener("submit", submitAction);

// let fahrenheitLink = document.querySelector("#toFahrenheit");
// fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

// let celciusLink = document.querySelector("#toCelcius");
// celciusLink.addEventListener("click", showCelciusTemperature);

search("Amsterdam");
