import * as messaging from "messaging";
import {MetlinkUI} from "./ui";

const ui = new MetlinkUI();

ui.updateUI("disconnected");

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  ui.updateUI("loading");
  messaging.peerSocket.send("Hi!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  ui.updateUI("loaded", evt.data);
}

