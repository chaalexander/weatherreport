// moment js
var showtime = $("#currentDay").text(setTime);
// console.log(showtime);

// key for city
var authKey = "5558573b04f9181b5515a2cc0280e2a9";

// key for UV index
var keyUV = "057e14341c48286f9140a48d5cf0795f";
var uvIndex = 0;

// local Storage
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

var queryTerm = "" || cityHistory[0];
callWeather(queryTerm);

// console.log(cityHistory);

function loadCities() {
  $("#lastCities").empty();
  for (var i = 0; i < cityHistory.length; i++) {
    var list = $("<div>");
    var cityNewDiv = $("<button class='load'>");
    cityNewDiv.text(cityHistory[i]);
    cityNewDiv.appendTo(list);
    $("#lastCities").append(list);
  }
}
loadCities();

// function to run the cities btn
$(document).on("click", ".load", function () {
  console.log("you click me");
  var cityInput = $(this).text();
  console.log($(this));
  console.log(cityInput);

  callWeather(cityInput);
});

// function to set the time
function setTime() {
  var time = moment().format("LLLL");
  return time;
}
// console.log(setTime());
function uvColor() {
  if (uvIndex >= 11.0) {
    $("#uv").css("color", "violet");
  } else if (uvIndex >= 8.0 && uvIndex < 11.0) {
    $("#uv").css("color", "red");
  } else if (uvIndex >= 6.0 && uvIndex < 8.0) {
    $("#uv").css("color", "orange");
  } else if (uvIndex >= 3.0 && uvIndex < 6.0) {
    $("#uv").css("color", "yellow");
  } else if (uvIndex < 3.0) {
    $("#uv").css("color", "lightblue");
  }
}

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

function callWeather(queryTerm) {
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
  }).then(function (response) {
    // console.log(response);
    $("#weatherBox").empty();
    // Convert the temperature to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    var feelsF = (response.main.feels_like - 273.15) * 1.8 + 32;
    var maxF = (response.main.temp_max - 273.15) * 1.8 + 32;
    var minF = (response.main.temp_min - 273.15) * 1.8 + 32;

    var guestInput = $(`<div class="card mb-3 border-danger" style="width: 25rem; height: max-content" >
    <img  src="http://openweathermap.org/img/wn/${
      response.weather[0].icon
    }@2x.png" class="card-img" alt="icon of weather">
  <div class="card-img-overlay">
  <h2 class="card-title">${response.name}</h2>
  <h4>${moment().format("dddd")}</h4>
  <h4>Humidity: ${response.main.humidity}</h4>
  <h4>Wind Speed:${response.wind.speed}mph</h4>
  <h4>Temperature:${tempF.toFixed(2)}</h4>
  <h4>Feels Like:${feelsF.toFixed(2)}</h4>
  <h4>Max:${maxF.toFixed(2)}</h4>
  <h4>Min:${minF.toFixed(2)}</h4>
  <h4 id="uv"></h4>
  </div>
  </div>`);

    $("#weatherBox").append(guestInput);

    // making ajax call for uv
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryURLuv =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      keyUV +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryURLuv,
      method: "GET"
    }).then(function (response) {
      $("#uv")
        .text("UV" + " " + response.value)
        .addClass(uvColor());
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
  }).then(function (response) {
    console.log(response.list);

    // creating the cards for the 4 days forecast
    var forecast5Days = $(` <div class="card-group"></div>`);
    var color = ["warning", "danger", "warning", "danger", "warning"];
    $("#forecast").empty();
    for (var i = 0; i < 5; i++) {
      var tempF = (response.list[i].main.temp - 273.15) * 1.8 + 32;
      var feelsF = (response.list[i].main.feels_like - 273.15) * 1.8 + 32;
      var maxF = (response.list[i].main.temp_max - 273.15) * 1.8 + 32;
      var minF = (response.list[i].main.temp_min - 273.15) * 1.8 + 32;

      var forecastCard = $(`<div id= "fore" class="card border-${color[i]} fore">
      <img src="http://openweathermap.org/img/wn/${
        response.list[i].weather[0].icon
      }@2x.png" class="card-img-top" alt="icon of weather">
      <div class="card-body text-${color[i]}">
        <h4 id= "foreti" class="card-title">${response.city.name}</h4>
        <div class= "card-text>
        <h5 class="time">${moment()
          .add(i + 1, "day")
          .format("dddd")}</h5>
        <h5>Temperature: ${tempF.toFixed(2)}</h5>
        <h5>Feels Like: ${feelsF.toFixed(2)}</h5>
        <h5>Min: ${minF.toFixed(2)} </h5>
        <h5>Max: ${maxF.toFixed(2)}</h5>
        <h5>Humidity: ${response.list[i].main.humidity}</h5>
        </div>
      </div>
      </div>`);

      forecast5Days.append(forecastCard);
      // closes for loop
    }
    $("#forecast").append(forecast5Days);
    // console.log(forecast5Days);
    // closes response forecast
  });
  // close call weatehr
}

$("#btn").on("click", function (e) {
  console.log("you click me");
  e.preventDefault();

  var cityDiv = $("<div>");
  var cityInput = $("#input")
    .val()
    .trim();
  if (cityInput) {
    cityDiv.text(cityInput);

    cityHistory.unshift(cityInput);

    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));

    loadCities();
    callWeather(cityInput);
  }

  // clear input
  $("#input").val("");
});

$(document).ready(function () {
  // loadCities();
  // callWeather();
  loadCities();
});