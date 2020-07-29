import document from "document";
import {STOPS} from "../common/globals";

const MINUTES_MILLIS = 1000 * 60;

export function MetlinkUI() {
  this.busStopList = document.getElementById("busStopList");
  this.statusText = document.getElementById("status");

  this.tiles = [];

  for (let i = 0; i < STOPS; i++) {
    let tile = this.busStopList.getElementById(`bus-stop-${i}`);
    if (tile) {
      tile.style.display = "none";
      this.tiles.push(tile);
    }
  }
}

function calculateDiffInMinutes(departure) {
  let diffTime = departure.displayDeparture - new Date();
  return Math.floor(diffTime / MINUTES_MILLIS);
}

function createRealDepartureStr(departure) {
  let diffMins = calculateDiffInMinutes(departure);
  return diffMins === 0 ? "due" : diffMins + " arriving";
}

function createForecastDeparture(departure) {
  return calculateDiffInMinutes(departure) + " scheduled";
}

function createDueString(departure) {
  return departure.expectedDeparture ?
    createRealDepartureStr(departure) :
    createForecastDeparture(departure);
}

MetlinkUI.prototype.updateUI = function (state, data) {
  if (state !== 'loaded') {
    this.busStopList.style.display = "none";

    if (state === "loading") {
      this.statusText.text = "Loading departures ...";
    }
    else if (state === "disconnected") {
      this.statusText.text = "Please check connection to phone and Fitbit App"
    }
    else if (state === "error") {
      this.statusText.text = "Something terrible happened.";
    }
    return;
  }

  const departures = data.departures;
  const index = data.index;
  const name = data.name;

  // console.log(`updateUI ${index} ${name} ${JSON.stringify(departures)}`);

  this.busStopList.style.display = "inline";

  let tile = this.tiles[index];
  if (!tile) {
    console.log("couldn't find tile with index " + index)
    return ;
  }

  tile.style.display = "inline";
  tile.getElementById("busStopDetail").text = name;

  if (!departures) return ;

  for (let j = 0; j < departures.length; j++) {
    let strDue = createDueString(departures[j]);
    tile.getElementById(`busDetail-${j}`).text = `${departures[j].busNum} - ${strDue}`;
  }
}