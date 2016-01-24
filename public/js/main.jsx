/* main.jsx
 * Main file that has dependencies on Locator and EventsDisplay
 * Initializes the location picker and default settings and populates
 * the events display for the first time
 */

var Locator = require("./client/locator.jsx");
var EventsDisplay = require("./client/events_display.jsx");




/* Render the location picker, initialize its settings, and also render
 * the events display
 */

Locator.renderLocator();
// 3-mile radius around Eventbrite HQ in SF
var defaultLat = 37.782380;
var defaultLong = -122.405225;
var defaultRadius = 3;
var defaultZoom = 12;
var defaultTimeframe = Locator.getSelectedTimeframe();

// Returns true if str represents a positive integer, false otherwise
var isPositiveInteger = function(str) {
  return /^[1-9]\d*$/.test(str);
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
        currentLocation.latitude,
        currentLocation.longitude,
        radius,
        Locator.getSelectedTimeframe(),
        1);
    }
  }
});

EventsDisplay.getEvents(
  defaultLat,
  defaultLong,
  defaultRadius,
  defaultTimeframe,
  1);