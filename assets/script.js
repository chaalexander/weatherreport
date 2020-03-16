// moment js
var showtime = $("#currentDay").text(setTime);
console.log(showtime);

// key and queryURL for city
var authKey = "5558573b04f9181b5515a2cc0280e2a9";

var queryTerm = " ";

var queryURLBase =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + authKey;

console.log(queryURLBase);

// key and queryURL for UV index

var authKeyUv = "057e14341c48286f9140a48d5cf0795f";

var queryURLuv =
  "https://api.openweathermap.org/data/2.5/uvi?f&lat=36.17&lon=-86.78&appid=" +
  authKeyUv;
console.log(queryURLuv);

// function to set the time
function setTime() {
  var time = moment().format("LLLL");
  return time;
}
console.log(setTime());

function callWeather(queryURLBase) {
  // making the ajax call for weather
  $.ajax({
    url: queryURLBase,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    $("#weatherBox").append("<h2>" + response.name + "</h2>");
    $("#weatherBox").append("<h4>" + setTime() + "</h4>");
    $("#weatherBox").append(
      "<h4>" + "Humidity" + " " + response.main.humidity + "</h4>"
    );
    $("#weatherBox").append(
      "<h4>" + "Wind Speed: " + " " + response.wind.speed + "</h4>"
    );

    // Convert the temp to fahrenheit
    // var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    // add temp content to html
    $("#weatherBox").append("<h4>" + response.main.temp + "</h4>");
    // $("#weatherBox").append(
    //   "<h4>" + "Temperature" + " " + tempF.toFixed(2) + "</h4>"
    // );

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
    console.log("City" + response.name);
  });
  // making ajax call for uv
  $.ajax({
    url: queryURLuv,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#uv").text("UV" + " " + response.value);
    console.log(response.value);
  });
}
$("#btn").on("click", function(e) {
  console.log("you click me");
  e.preventDefault();

  // Takes in the inputted value
  queryTerm = $("#input")
    .val()
    .trim();
  console.log(queryTerm);

  // Concatenates inputted value with base url
  var newURL = queryURLBase + "&q" + queryTerm;
  console.log(newURL);
  callWeather(newURL);
});
