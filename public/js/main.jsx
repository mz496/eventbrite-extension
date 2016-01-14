var Locator = require("./client/locator.jsx");
var EventsDisplay = require("./client/events_display.jsx");

ReactDOM.render(
  <Locator />,
  document.getElementById("locator")
);

ReactDOM.render(
  <EventsDisplay />,
  document.getElementById("events-display")
);

$("#location-picker").locationpicker();