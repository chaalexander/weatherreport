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
    $("#date").text();

    console.log(response.name);
  });
});
