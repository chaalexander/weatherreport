var showtime = $("#currentDay").text(setTime);
console.log(showtime);

var key = "5558573b04f9181b5515a2cc0280e2a9";

var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Nashville&appid=" +
  key;
console.log(queryURL);

function setTime() {
  var time = moment().format("MMMM Do YYYY, h:mm a");
  return time;
}
console.log(setTime());

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  $("#search").on("click", function(e) {
    e.preventDefault();
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
  });
});
