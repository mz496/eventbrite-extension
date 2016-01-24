(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* events_display.jsx
 * Creates the list of events in range as a result of the API call
 */

// The default current page
var page = 1;
// The default page count
var pageCount = 1;
// The global event array we use to store API results
var events = [];
// Saving API call string for future queries
var recordAPIcall = "";
// Eventbrite API key
var token = "5UTR4NCSQASRGEP5ALUO";

var eventsLoadingID = "events-loading-overlay";



// A single event row in the output
var EventEntry = React.createClass({displayName: "EventEntry",
  linkClick: function() {
    chrome.tabs.create({ url: this.props.url });
  },
  render: function() {
    return (
      React.createElement("a", {className: "event-entry", 
        onClick: this.linkClick}, 
        React.createElement("div", null, 
        React.createElement("div", {className: "event-time"}, 
          this.props.timeRange
        ), 
        React.createElement("div", {className: "event-title"}, 
          this.props.eventName
        )
        )
      )
    );
  }
});

// The container for all the EventEntry's
var EventsDisplay = React.createClass({displayName: "EventsDisplay",
  nextPage: function() {
    page += 1;
    getEventsByAPIcall(recordAPIcall, page);
  },
  render: function() {
    return (
      React.createElement("div", null, 
      events, 

      React.createElement("a", {
        style: {"display": noMoreEvents() ? "none" : "block"}, 
        className: "load-more", 
        onClick: this.nextPage}, 
        "Load more"
      ), 

      React.createElement("div", {
        style: {"display": noMoreEvents() ? "block" : "none"}, 
        className: "no-more-events"}, 
        "(No more events)"
      ), 

      React.createElement("div", {id: eventsLoadingID}
      )
      
      )
    );
  }
});

/* Mapping function that takes in an API response and returns an EventEntry
 * using only the parameters we need from the event
 */
var condenseEvent = function(event) {
  var fmt = "ddd, MMM D h:mm A";
  return (
    React.createElement(EventEntry, {
      eventName: event.name.text, 
      url: event.url, 
      timeRange: moment(event.start.local).format(fmt), 
      key: event.name.text})
  );
}

/* Returns true if there are no more events to show (either we ran out
 * or the response was empty)
 */
var noMoreEvents = function() {
  return pageCount === 0 || pageCount >= page;
}

// Show and hide an overlay over the events list
var showLoadingOverlay = function() {
  $("#" + eventsLoadingID).css("display","block");
}
var hideLoadingOverlay = function() {
  $("#" + eventsLoadingID).css("display","none");
}




// Get the events from Eventbrite API by parameters
var getEvents = function(latitude, longitude, radius, timeframe, page) {
  var APIcall = "https://www.eventbriteapi.com/v3/events/search/?" +
    "&popular=on" +
    "&location.latitude=" + latitude +
    "&location.longitude=" + longitude +
    "&location.within=" + radius + "mi" +
    "&start_date.keyword=" + timeframe +
    "&token=" + token;

  recordAPIcall = APIcall;
  getEventsByAPIcall(APIcall, page);
}

// Make API call based on what we already have, but with a different page #
var getEventsByAPIcall = function(APIcall, page) {
  showLoadingOverlay();
  $.get(APIcall + "&page=" + page,
  function(response) {
    pageCount = response.pagination.page_count;
    events = events.concat(response.events.map(condenseEvent));
    renderEventsDisplay();
    hideLoadingOverlay();
  });
};

var renderEventsDisplay = function() {
  ReactDOM.render(
    React.createElement(EventsDisplay, null),
    document.getElementById("events-display")
  );
};

/* Reset variables to their original values to start anew for each update
 * to the position/radius
 */
var flushValues = function() {
  page = 1;
  pageCount = 1;
  events = [];
  recordAPIcall = "";
}



// Expose the following functions to render and refresh the events display
module.exports = EventsDisplay;
module.exports.getEvents = getEvents;
module.exports.flushValues = flushValues;

},{}],2:[function(require,module,exports){
/* locator.jsx
 * Creates the interface for the location picker controls
 */

var EventsDisplay = require("./events_display.jsx");

var pickerRadiusID = "picker-radius";
var pickerAddressID = "picker-address";
var timeframeSelectID = "timeframe-select";
var pickerID = "picker";


var Locator = React.createClass({displayName: "Locator",
  timeframeChanged: function(e) {
    var pickerState = $("#" + pickerID).locationpicker("map");
    var currentLatitude = pickerState.location.latitude;
    var currentLongitude = pickerState.location.longitude;
    var currentRadius = pickerState.map.radius;

    EventsDisplay.flushValues();
    EventsDisplay.getEvents(
      currentLatitude,
      currentLongitude,
      currentRadius,
      getSelectedTimeframe(),
      1);

    timeframe = selected;
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("p", null, "Find popular events happening ", /*

        */React.createElement("select", {
          id: timeframeSelectID, 
          defaultValue: "this_weekend", 
          onChange: this.timeframeChanged}, 
            React.createElement("option", {value: "today"}, "today"), 
            React.createElement("option", {value: "this_weekend"}, "this weekend"), 
            React.createElement("option", {value: "this_week"}, "this week"), 
            React.createElement("option", {value: "this_month"}, "this month")
        ), " ", /*

        */"within ", /*
        
        */React.createElement("input", {
          type: "number", 
          min: "1", 
          id: pickerRadiusID}), " ", /*
        
        */"miles of ", /*
        
        */React.createElement("input", {
          type: "text", 
          placeholder: "Address", 
          size: "40", 
          id: pickerAddressID})), 

        React.createElement("div", {id: pickerID})
      )
    );
  }
});

var renderLocator = function() {
  ReactDOM.render(
    React.createElement(Locator, null),
    document.getElementById("locator")
  );
};

var getSelectedTimeframe = function() {
  return Array.prototype.filter.
    call(jQuery.makeArray($("select#" + timeframeSelectID + " option")), i => i.selected).
    map(i => i.value)[0];
}



// Expose the following variables for initializing and rendering from main
module.exports = Locator;
module.exports.renderLocator = renderLocator;
module.exports.pickerRadiusID = pickerRadiusID;
module.exports.pickerAddressID = pickerAddressID;
module.exports.getSelectedTimeframe = getSelectedTimeframe;

},{"./events_display.jsx":1}],3:[function(require,module,exports){
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

},{"./client/events_display.jsx":1,"./client/locator.jsx":2}]},{},[3]);
