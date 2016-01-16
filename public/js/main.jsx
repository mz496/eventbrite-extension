/* main.jsx
 * Main file that has dependencies on Locator and EventsDisplay
 * Initializes the location picker and default settings and populates
 * the events display for the first time
 */

var Locator = require("./client/locator.jsx");
var EventsDisplay = require("./client/events_display.jsx");



// 3-mile radius around Eventbrite HQ in SF

var defaultLat = 37.782380;
var defaultLong = -122.405225;
var defaultRadius = 3;
var defaultZoom = 12;

var token = "5UTR4NCSQASRGEP5ALUO";



/* Render the location picker, initialize its settings, and also render
 * the events display
 */

Locator.renderLocator();

// Returns true if str represents a positive integer, false otherwise
var isPositiveInteger = function(str) {
  return /^[1-9]\d*$/.test(str);
}

// Constructs the Eventbrite API call
var getAPIcall = function(latitude, longitude, radius) {
  return "https://www.eventbriteapi.com/v3/events/search/?" +
    "&popular=on" +
    "&location.latitude=" + latitude +
    "&location.longitude=" + longitude +
    "&location.within=" + radius + "mi" +
    "&start_date.keyword=this_weekend" +
    "&token=" + token;
}

$("#picker").locationpicker({
  location: {latitude: defaultLat, longitude: defaultLong},
  radius: defaultRadius,
  zoom: defaultZoom,
  inputBinding: {
    radiusInput: $("#" + Locator.pickerRadiusID),
    locationNameInput: $("#" + Locator.pickerAddressID)
  },
  enableAutocomplete: true,
  onchanged: function(currentLocation, radius, isMarkerDropped) {
    if (isPositiveInteger(radius)) {
      EventsDisplay.flushValues();
      EventsDisplay.getEvents(
        getAPIcall(
          currentLocation.latitude,
          currentLocation.longitude,
          radius),
        1);
    }
  }
});

EventsDisplay.getEvents(
  getAPIcall(defaultLat, defaultLong, defaultRadius),
  1);