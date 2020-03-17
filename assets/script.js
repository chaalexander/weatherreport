// moment js
var showtime = $("#currentDay").text(setTime);
// console.log(showtime);

// key for city
var authKey = "5558573b04f9181b5515a2cc0280e2a9";

// keyfor UV index
var keyUV = "057e14341c48286f9140a48d5cf0795f";

// local Storage
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

// console.log(cityHistory);

function loadCities() {
  for (var i = cityHistory.length - 10; i < cityHistory.length; i++) {
    var cityNewDiv = $("<div>");
    cityNewDiv.text(cityHistory[i]);
    cityNewDiv.appendTo("#lastCities");
  }
}
console.log(loadCities());

// function to set the time
function setTime() {
  var time = moment().format("LLLL");
  return time;
}
// console.log(setTime());

var queryTerm = " ";

// creating the input box, btn and display area for local storage

var newDiv = $("<div>");
// console.log(newDiv);
$("#container").append(newDiv);

var newForm = $(`<form class="form-inline my-2 my-lg-0" id= "form">
  <input
    class="form-control mr-sm-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    id= "input"
  />
  <button
    class="btn btn-outline-dark my-2 my-sm-0"
    type="submit"
    id="btn"
  ><i class= "fa fa-question-circle"></i>
    Search
  </button>
</form>`);
$(newDiv).append(newForm);
$("#input").append("#btn");
// console.log(newForm);

function callWeather(queryURL) {
  // Takes in the inputted value
  var queryTerm = $("#input")
    .val()
    .trim();

  // clear input
  $("#input").empty();

  // queryURL for city current day
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    queryTerm +
    "&appid=" +
    authKey;
  // console.log(queryURL);

  // making the ajax call for weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);

    // Convert the temperature to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    var feelsF = (response.main.feels_like - 273.15) * 1.8 + 32;
    var maxF = (response.main.temp_max - 273.15) * 1.8 + 32;
    var minF = (response.main.temp_min - 273.15) * 1.8 + 32;
    var guestInput = $(`<div class="card bg-danger text-white">
    <img src="http://openweathermap.org/img/wn/${
      response.weather[0].icon
    }@2x.png" class="card-img-top" alt="icon of weather">
  <div class="card-img-overlay">
  <h3>${response.name}</h3>
  <h5>${moment().calendar()}</h5>
  <h5>Humidity: ${response.main.humidity}</h5>
  <h5>"Wind Speed:${response.wind.speed}"mph"</h5>
  <h5>"Temperature:${tempF.toFixed(2)}</h5>
  <h5>"Feels Like:${feelsF.toFixed(2)}</h5>
  <h5>"Max:${maxF.toFixed(2)}</h5>
  <h5>"Min:${minF.toFixed(2)}</h5>
  <h5 id="uv"></h5>
  </div>
  </div>`);

    $("#weatherBox").append(guestInput);

    // making ajax call for uv
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryURLuv =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      keyUV +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryURLuv,
      method: "GET"
    }).then(function(response) {
      $("#uv").text("UV" + " " + response.value);
    });
  });

  // queryURL for 5 days
  var queryForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    queryTerm +
    "&appid=" +
    authKey;
  console.log(queryForecast);

  // ajaxcall for forecast

  $.ajax({
    url: queryForecast,
    method: "GET"
  }).then(function(response) {
    console.log(response.list);

    // creating the cards for the 4 days forecast
    var forecast5Days = $(` <div class="card-group"></div>`);
    var color = ["warning", "danger", "success", "warning", "danger"];

    for (var i = 0; i < 5; i++) {
      var tempF = (response.list[i].main.temp - 273.15) * 1.8 + 32;
      var feelsF = (response.list[i].main.feels_like - 273.15) * 1.8 + 32;
      var maxF = (response.list[i].main.temp_max - 273.15) * 1.8 + 32;
      var minF = (response.list[i].main.temp_min - 273.15) * 1.8 + 32;

      var forecastCard = $(`<div class="card border-${
        color[i]
      } mb-3" style="max-width: 18rem;">
      <img src="http://openweathermap.org/img/wn/${
        response.list[i].weather[0].icon
      }@2x.png" class="card-img-top" alt="icon of weather">
      <div class="card-body text-${color[i]}">
        <h5 class="card-title">${response.city.name}</h5>
        <p class="time"></p>
        <p>Temperature: ${tempF.toFixed(2)}</p>
        <p>Feels Like: ${feelsF.toFixed(2)}</p>
        <p>Min: ${minF.toFixed(2)} </p>
        <p>Max: ${maxF.toFixed(2)}</p>
        <p>Humidity: ${response.list[i].main.humidity}</p>
      </div>
      </div>`);

      forecast5Days.append(forecastCard);
    }
    $("#forecast").append(forecast5Days);
    // console.log(forecast5Days);
  });
}
$("#btn").on("click", function(e) {
  console.log("you click me");
  e.preventDefault();

  var cityDiv = $("<div>");
  var cityInput = $("#input")
    .val()
    .trim();

  cityDiv.text(cityInput);

  cityHistory.push(cityInput);

  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

  cityDiv.prependTo(lastCities);
  callWeather();
});
