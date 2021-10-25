function displayTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemperature");
  let cityEmelement = document.querySelector("#currentCity");
  let descriptionEmelement = document.querySelector("#currentDescription");
  let feelElement = document.querySelector("#currentFeel");
  let humidityElement = document.querySelector("#currentHumidity");
  let windElement = document.querySelector("#currentWind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityEmelement.innerHTML = response.data.name;
  descriptionEmelement.innerHTML = response.data.weather[0].description;
  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
