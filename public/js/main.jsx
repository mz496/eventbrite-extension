var Locator = require("./client/locator.jsx");
var EventsDisplay = require("./client/events_display.jsx");

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

Locator.renderLocator();



var defaultLat = 37.782380;
var defaultLong = -122.405225;
var defaultRadius = 3;
var defaultZoom = 12;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    defaultLat = position.coords.latitude;
    defaultLong = position.coords.longitude;
  });
}

EventsDisplay.getEvents(defaultLat, defaultLong, defaultRadius);