(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var page = 1;
var pageCount = 1;
var events = [];
var recordAPIcall = "";



var EventTableEntry = React.createClass({displayName: "EventTableEntry",
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

var EventsDisplay = React.createClass({displayName: "EventsDisplay",
  nextPage: function() {
    page += 1;
    getEvents(recordAPIcall, page);
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
      )
      
      )
    );
  }
});

var condenseEvent = function(event) {
  var fmt = "ddd, MMM D h:mm A";
  return (
    React.createElement(EventTableEntry, {
      eventName: event.name.text, 
      url: event.url, 
      timeRange: moment(event.start.local).format(fmt), 
      key: event.name.text})
  );
}

var noMoreEvents = function() {
  return pageCount === 0 || pageCount >= page;
}


var getEvents = function(APIcall, page) {
  recordAPIcall = APIcall;
  $.get(APIcall + "&page=" + page,
  function(response) {
    console.log(response);
    pageCount = response.pagination.page_count;
    events = events.concat(response.events.map(condenseEvent));
    renderEventsDisplay();
  });
};

var renderEventsDisplay = function() {
  ReactDOM.render(
    React.createElement(EventsDisplay, null),
    document.getElementById("events-display")
  );
};

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

var pickerRadiusID = "picker-radius";
var pickerAddressID = "picker-address";

var Locator = React.createClass({displayName: "Locator",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("p", null, "Find popular events happening this weekend within ", /*
        
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

        React.createElement("div", {id: "picker"})
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

// Expose the following variables for initializing and rendering from main
module.exports = Locator;
module.exports.renderLocator = renderLocator;
module.exports.pickerRadiusID = pickerRadiusID;
module.exports.pickerAddressID = pickerAddressID;

},{}],3:[function(require,module,exports){
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

},{"./client/events_display.jsx":1,"./client/locator.jsx":2}]},{},[3]);
