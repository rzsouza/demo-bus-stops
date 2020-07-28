import { me } from "companion";
import * as messaging from "messaging";
import {MetlinkAPI} from "./metlink";
import { settingsStorage } from "settings";

messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  sendBusStopSchedule();
}

settingsStorage.onchange = function(evt) {
  console.log("changed settings");
  sendBusStopSchedule();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}

function loadDeparturesForStop(stopNum, index, stopName) {
  console.log(`loadDeparturesForStop ${stopNum}, ${index}, ${stopName}`);

  const metlinkAPI = new MetlinkAPI();

  metlinkAPI.departures(stopNum).then(function (departures) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Limit results to the number of tiles available in firmware
      messaging.peerSocket.send({ "departures" : departures, "index" : index, "name": stopName });
    }
  }).catch(function (err) {
    console.log(err);
  })
}

function sendBusStopSchedule() {
  console.log("sendBusStopSchedule");

  for (let i = 0; i < 4; i++) {
    let stopNum = settingsStorage.getItem(`stop_num_setting_${i}`);

    if (stopNum) {
      stopNum = JSON.parse(stopNum).name;
      let stopName = settingsStorage.getItem(`stop_name_setting_${i}`);
      stopName = stopName ? JSON.parse(stopName).name : stopNum;
      loadDeparturesForStop(stopNum, i, stopName);
    }
  }
}