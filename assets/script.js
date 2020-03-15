// moment js
var showtime = $("#currentDay").text(setTime);
console.log(showtime);

// key and queryURL fro city
var key = "5558573b04f9181b5515a2cc0280e2a9";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Nashville&appid=" +
  key;
console.log(queryURL);

// key and queryURL for UV index

var keyUV = "057e14341c48286f9140a48d5cf0795f";

var queryURLuv =
  "https://api.openweathermap.org/data/2.5/uvi?f&lat=36.17&lon=-86.78&appid=" +
  keyUV;
console.log(queryURLuv);

// funciton to set the time
function setTime() {
  var time = moment().format("MMMM Do YYYY, h:mm a");
  return time;
}
console.log(setTime());

// making the ajax call for weather
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var newDiv = $("<div>");
  console.log(newDiv);
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
    ><i class= "fa fa-question-circle">
      Search
    </button>
  </form>`);
  $(newDiv).append(newForm);
  $("#input").append("#btn");
  console.log(newForm);

  $("#btn").on("click", function(e) {
    e.preventDefault();

    var guestInput = `<h1 id="city"></h1>
    <h5 id="date"></h5>
    <h5 id="temperature"></h5>
    <h5 id="humidity"></h5>
    <h5 id="wind"></h5>
    <h5 id="uv"></h5>`;

    $("#weatherBox").append(guestInput);

    $("#city").text(response.name);
    $("#date").text(moment().format("MMM Do YYYY"));
    $("#humidity").text("Humidity" + " " + response.main.humidity);
    $("#wind").text("Wind" + " " + response.wind.speed);

    // Convert the temp to fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;

    // add temp content to html
    $("#temperature").text(response.main.temp);
    $("#temperature").text("Temperature" + " " + tempF.toFixed(2));

    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);

    // making ajax call for uv
    $.ajax({
      url: queryURLuv,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $("#uv").text("UV" + " " + response.value);
      console.log(response.value);
    });
  });
});
