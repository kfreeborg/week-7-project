var newCasesEl = document.getElementById("newCases");
var totalCasesEl = document.getElementById("totalCases");
var newDeathsEl = document.getElementById("newDeaths");
var totalDeathsEl = document.getElementById("totalDeaths");

var apiSummary = "https://api.covid19api.com/summary"

function summaryData () {
    fetch(apiSummary)
    .then(response => {
        return response.json();
    })
    .then(json => {
        displaySummary(json);
    });
}

function displaySummary(json) {
    newCasesEl.textContent = json.Global.NewConfirmed;
    totalCasesEl.textContent = json.Global.TotalConfirmed;
    newDeathsEl.textContent = json.Global.NewDeaths;
    totalDeathsEl.textContent = json.Global.TotalDeaths;
}

summaryData();