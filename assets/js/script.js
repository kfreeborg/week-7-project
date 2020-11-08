var newCasesEl = document.getElementById("newCases");
var totalCasesEl = document.getElementById("totalCases");
var newDeathsEl = document.getElementById("newDeaths");
var totalDeathsEl = document.getElementById("totalDeaths");
var selectCountryEl = document.getElementById("country");

var apiSummary = "https://api.covid19api.com/summary"

function summaryData() {
  fetch(apiSummary)
    .then(response => {
      return response.json();
    })
    .then(json => {
      displaySummary(json);
    });
}

function displaySummary(json) {
  newCasesEl.textContent = json.Global.NewConfirmed.toLocaleString();
  totalCasesEl.textContent = json.Global.TotalConfirmed.toLocaleString();
  newDeathsEl.textContent = json.Global.NewDeaths.toLocaleString();
  totalDeathsEl.textContent = json.Global.TotalDeaths.toLocaleString();
}

summaryData();

let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 1.5,
  });
}


let dropdown = $("#search");

dropdown.empty();

dropdown.append("<option selected='true' disabled>Select Country</option>");
dropdown.prop("selectedIndex", 0);

$.getJSON(apiSummary, function (data) {
  $.each(data.Countries, function (key, entry) {
    dropdown.append($("<option></option>").text(entry.Country));
  })
});



$("#search").change(function(){
  var selectedCountry = document.getElementById("search");
  var userValue = selectedCountry.options[selectedCountry.selectedIndex].text;

  $.ajax({
    type: "GET",
    url: "https://api.covid19api.com/country/" + userValue + "/status/confirmed",
    dataType: "json",
    success: function(data) {
      console.log("data form api call is : " , data);
    }
  })
});