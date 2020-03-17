// moment js
var showtime = $("#currentDay").text(setTime);

// key for city
var authKey = "5558573b04f9181b5515a2cc0280e2a9";

// key for UV index
var keyUV = "057e14341c48286f9140a48d5cf0795f";

// local Storage
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

function loadCities() {
  for (var i = 0; i < cityHistory.length; i++) {
    var cityNewDiv = $("<div>");
    cityNewDiv.text(cityHistory[i]);
    cityNewDiv.appendTo("#lastCities");
  }
}

// function to set the time
function setTime() {
  var time = moment().format("LLLL");
  return time;
}

var queryTerm = " ";

// creating the input box, btn and display area for local storage

var newDiv = $("<div>");

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

// creating the place to display the weather
var guestInput = `<h1 id="city"></h1>
    <h5 id="date"></h5>
    <h5 id="temperature"></h5>
    <h5 id="feels"></h5>
    <h5 id="max"></h5>
    <h5 id="min"></h5>
    <h5 id="humidity"></h5>
    <h5 id="wind"></h5>
     <h5 id="uv"></h5>`;

$("#weatherBox").append(guestInput);

function callWeather(queryURL) {
  // Takes in the inputted value
  var queryTerm = $("#input")
    .val()
    .trim();

  // queryURL for city current day
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    queryTerm +
    "&appid=" +
    authKey;

  // making the ajax call for weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#city").text(response.name);
    $("#date").text(setTime());
    $("#humidity").text("Humidity:" + " " + response.main.humidity);
    $("#wind").text("Wind Speed: " + " " + response.wind.speed + "mph");

    // Convert the temperature to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    var feelsF = (response.main.feels_like - 273.15) * 1.8 + 32;
    var maxF = (response.main.temp_max - 273.15) * 1.8 + 32;
    var minF = (response.main.temp_min - 273.15) * 1.8 + 32;

    // add temp content to html
    $("#temperature").text(response.main.temp);
    $("#temperature").text("Temperature:" + " " + tempF.toFixed(2));

    // add fells like to html
    $("#feels").text(response.main.feels_like);
    $("#feels").text("Feels Like:" + " " + feelsF.toFixed(2));

    // add max temp
    $("#max").text(response.main.temp_max);
    $("#max").text("Max:" + " " + maxF.toFixed(2));

    // add min temp
    $("#min").text(response.main.temp_min);
    $("#min").text("Min:" + " " + minF.toFixed(2));

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
    console.log(response);

    for (var i = 0; i < 5; i++) {
      console.log(response.list[i]);

      var divForecast = $("<div>");
      $("#forecast").append(divForecast);

      var forecast5Days = `<h1 id="city"></h1>
        <h5 id="date"></h5>
        <h5 id="temperature"></h5>
        <h5 id="feels"></h5>
        <h5 id="max"></h5>
        <h5 id="min"></h5>
        <h5 id="humidity"></h5>
        <h5 id="wind"></h5>
         <h5 id="uv"></h5>`;
      $(divForecast).append(forecast5Days);

      $("#city").text(response.city.name);
      // $("#date").text(setTime());
      $("#humidity").text("Humidity:" + " " + response.list[i].main.humidity);
      $("#wind").text(
        "Wind Speed: " + " " + response.list[i].wind.speed + "mph"
      );
      console.log(forecast5Days);
    }
  });
}
$("#btn").on("click", function(e) {
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
