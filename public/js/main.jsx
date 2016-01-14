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

$("document").ready(function() {
  console.log($("#picker"));
  $("#picker").locationpicker({
    location: {latitude: 46.15, longitude: 2.747},
    radius: 1500,
    inputBinding: {
      latitudeInput: $("#picker-lat"),
      longitudeInput: $("#picker-long"),
      radiusInput: $("#picker-radius"),
      locationNameInput: $("#picker-address")
    }
  });
});