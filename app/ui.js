import document from "document";

const MINUTES_MILIS = 1000 * 60;

export function MetlinkUI() {
  this.busStopList = document.getElementById("busStopList");

  this.tiles = [];

  for (let i = 0; i < 1; i++) {
    let tile = this.busStopList.getElementById(`bus-stop-${i}`);
    if (tile) {
      this.tiles.push(tile);
    }
  }
}

function calculateDiffInMinutes(departure) {
  let diffTime = departure.displayDeparture - new Date();
  return Math.floor(diffTime / MINUTES_MILIS);
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

MetlinkUI.prototype.updateUI = function (data) {
  console.log(`updateUI ${data}`)

  const departures = data.departures;
  const index = data.index;
  const name = data.name;

  this.busStopList.style.display = "inline";

  let tile = this.tiles[index];
  if (!tile) return ;

  tile.style.display = "inline";
  tile.getElementById("busStopDetail").text = name;

  if (!departures) return ;

  for (let j = 0; j < departures.length; j++) {
    let strDue = createDueString(departures[j]);
    tile.getElementById(`busDetail-${j}`).text = `${departures[j].busNum} - ${strDue}`;
  }
}