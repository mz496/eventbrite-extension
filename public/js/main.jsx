var Locator = require("./client/locator.jsx");
var EventsDisplay = require("./client/events_display.jsx");

var defaultLat = 37.782380;
var defaultLong = -122.405225;
var defaultRadius = 3;
var defaultZoom = 12;
var token = "5UTR4NCSQASRGEP5ALUO";

Locator.renderLocator();

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
        getAPIcall(defaultLat, defaultLong, defaultRadius),
        1);
    }
  }
});



if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    defaultLat = position.coords.latitude;
    defaultLong = position.coords.longitude;
  });
}

var getAPIcall = function(latitude, longitude, radius) {
  return "https://www.eventbriteapi.com/v3/events/search/?" +
    "&popular=on" +
    "&location.latitude=" + latitude +
    "&location.longitude=" + longitude +
    "&location.within=" + radius + "mi" +
    "&start_date.keyword=this_weekend" +
    "&token=" + token;
}

EventsDisplay.getEvents(
  getAPIcall(defaultLat, defaultLong, defaultRadius),
  1);