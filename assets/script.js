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
  for (var i = 0; i < cityHistory.length; i++) {
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

// creating the place to display the weather

// var guestInput = $(`<div class="card bg-dark text-white">
// <img src="http://openweathermap.org/img/wn/2x.png" class="card-img" alt="...">
// <div class="card-img-overlay">
//   <h5 class="card-title" id="city"></h5>
//   <p class="card-text" id= "current-day">
//   <h3 id="city"></h3>
// <h5 id="date"></h5>
// <h5 id="temperature"></h5>
// <h5 id="feels"></h5>
// <h5 id="max"></h5>
// <h5 id="min"></h5>
// <h5 id="humidity"></h5>
// <h5 id="wind"></h5>
// //      <h5 id="uv"></h5>

//   </p>

// </div>
// </div>`);
var guestInput = `<h3 id="city"></h3>
    <h5 id="date"></h5>
    <h5 id="temperature"></h5>
    <h5 id="feels"></h5>
    <h5 id="max"></h5>
    <h5 id="min"></h5>
    <h5 id="humidity"></h5>
    <h5 id="wind"></h5>
     <h5 id="uv"></h5>`;

$("#weatherBox").append(guestInput);
// console.log(guestInput);

var urlIcon = "http://openweathermap.org/img/wn/2x.png";
console.log(urlIcon);

function callWeather(queryURL) {
  // Takes in the inputted value
  var queryTerm = $("#input")
    .val()
    .trim();

  // clear input
  // $("#input").text("");

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

    $("#city").text(response.name);
    $("#date").text(moment().format("dddd"));
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
    console.log(response.list);

    // creating the cards for the 4 days forecast
    var divForecast = $("<div>");
    $("#forecast").append(divForecast);

    var forecast5Days = $(` <div class="card-group">
          
    
    <div class="card border-primary mb-3" style="max-width: 18rem;">
    <img src="http://openweathermap.org/img/wn/10d@2x.png" class="card-img-top" alt="...">
    <div class="card-body text-primary">
      <h5 class="card-title"></h5>
      <p class="time1"></p>
      <p class="humidity1"></p>
      <p class="speed1"></p>
      <p class="temp1"></p>
      <p class="feels1"></p>
      <p class="max1"></p>
      <p class="min1"></p>
      
    </div>
  </div>
          
  
  <div class="card border-success mb-3" style="max-width: 18rem;">
  <img src="http://openweathermap.org/img/wn/10d@2x.png" class="card-img-top" alt="...">
  <div class="card-body text-success">
    <h5 class="card-title"></h5>
    <p class="card-text2">
      
    </p>
  </div>
</div>
          
<div class="card border-danger mb-3" style="max-width: 18rem;">
<img src="http://openweathermap.org/img/wn/10d@2x.png" class="card-img-top" alt="...">
<div class="card-body text-danger">
  <h5 class="card-title"></h5>
  <p class="card-text3">
  
  </p>
</div>
</div>

<div class="card border-warning mb-3" style="max-width: 18rem;">
<img src="http://openweathermap.org/img/wn/10d@2x.png" class="card-img-top" alt="...">
 <div class="card-body text-warning">
    <h5 class="card-title"></h5>
    <p class="card-text4">
    
    </p>
  </div>
 </div>
 
</div>`);

    $("#forecast").append(forecast5Days);
    console.log(forecast5Days);

    $(".card-title").text(response.city.name);
    $(".time1").text(moment().add(1, "days"));
    $(".card-text2").text(moment().add(2, "days"));
    $(".card-text3").text(moment().add(3, "days"));
    $(".card-text4").text(moment().add(4, "days"));

    $(".humidity1").text("Humidity:" + " " + response.list[7].main.humidity);
    $(".speed1").text(
      "Wind Speed:" + " " + response.list[7].wind.speed + "mph"
    );
    // Convert the temperature to fahrenheit
    var tempF1 = (response.list[7].main.temp - 273.15) * 1.8 + 32;
    var feelsF1 = (response.list[7].main.feels_like - 273.15) * 1.8 + 32;
    var maxF1 = (response.list[7].main.temp_max - 273.15) * 1.8 + 32;

    var minF1 = (response.list[7].main.temp_min - 273.15) * 1.8 + 32;

    // add temp content to html
    $(".temp1").text(response.list[7].main.temp);
    $(".temp1").text("Temperature:" + " " + tempF1.toFixed(2));

    // add fells like to html
    $(".feels1").text(response.list[7].main.feels_like);
    $("feels1").text("Feels Like:" + " " + feelsF1.toFixed(2));

    // add max temp
    $(".max1").text(response.list[7].main.temp_max);
    $(".max1").text("Max:" + " " + maxF1.toFixed(2));

    // add min temp
    $(".min1").text(response.list[7].main.temp_min);
    $(".min1").text("Min:" + " " + minF1.toFixed(2));
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
