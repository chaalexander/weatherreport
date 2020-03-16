// moment js
var showtime = $("#currentDay").text(setTime);
console.log(showtime);

// key and queryURL for city
var authKey = "5558573b04f9181b5515a2cc0280e2a9";

// function to set the time
function setTime() {
  var time = moment().format("LLLL");
  return time;
}
console.log(setTime());

function callWeather() {
  // Takes in the inputted value
  var queryTerm = $("#input")
    .val()
    .trim();

  // queryURL for city
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    queryTerm +
    "&appid=" +
    authKey;
  console.log(queryURL);

  // key and queryURL for UV index

  // var queryURLuv =
  //   "https://api.openweathermap.org/data/2.5/uvi?f&lat=36.17&lon=-86.78&appid=" +
  //   authKeyUv;
  // console.log(queryURLuv);

  // making the ajax call for weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#city").text(response.name);
    $("#date").text(setTime());
    $("#humidity").text("Humidity" + " " + response.main.humidity);
    $("#wind").text("Wind Speed: " + " " + response.wind.speed);

    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    // add temp content to html
    $("#temperature").text(response.main.temp);
    $("#temperature").text("Temperature" + " " + tempF.toFixed(2));
  });
  // making ajax call for uv
  // $.ajax({
  //   url: queryURLuv,
  //   method: "GET"
  // }).then(function(response) {
  //   console.log(response);
  //   $("#uv").text("UV" + " " + response.value);
  //   console.log(response.value);
  // });
}
$("#btn").on("click", function(e) {
  e.preventDefault();
  callWeather();
});
