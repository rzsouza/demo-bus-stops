import {BUS_COUNT} from "../common/globals";

export function MetlinkAPI() {
  console.log("starting Metlink API client");
}

const METLINK_DEPARTURES_URL = "https://www.metlink.org.nz/api/v1/StopDepartures/";

const MY_BUSES = new Set(["18e", "31x"]);

MetlinkAPI.prototype.departures = function(stopNum) {
  return new Promise(function(resolve, reject) {
    fetch(METLINK_DEPARTURES_URL + stopNum).then(function(response){
       return response.json();
     }).then(function (json) {
       let departures = [];

       let data = json["Services"];
       let added = 0;
       for (let i = 0; i < data.length && added < BUS_COUNT; i++) {

         let d = {
           "busNum" : data[i]["ServiceID"],
           "expectedDeparture" : Date.parse(data[i]["ExpectedDeparture"]),
           "displayDeparture": Date.parse(data[i]["DisplayDeparture"]),
         }

         if (d.busNum && MY_BUSES.has(d.busNum)) {
           departures.push(d);
           added++;
         }
       }

       resolve(departures);
     }).catch(function (error) {
       reject(error);
     });
  });
}