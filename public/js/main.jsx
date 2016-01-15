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



var defaultLat = 26.23447;
var defaultLong = -80.2644087;
var defaultRadius = 200;
var defaultZoom = 12;

EventsDisplay.getEvents(defaultLat, defaultLong, defaultRadius);

$("#picker").locationpicker({
  location: {latitude: defaultLat, longitude: defaultLong},
  radius: defaultRadius,
  zoom: defaultZoom,
  inputBinding: {
    latitudeInput: $("#picker-lat"),
    longitudeInput: $("#picker-long"),
    radiusInput: $("#picker-radius"),
    locationNameInput: $("#picker-address")
  },
  enableAutocomplete: true,
  onchanged: function(currentLocation, radius, isMarkerDropped) {
    if (!isNaN(radius) && radius > 0) {
      EventsDisplay.getEvents(
        currentLocation.latitude,
        currentLocation.longitude,
        radius);
    }
  }
});
