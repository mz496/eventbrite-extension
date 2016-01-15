(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EventTableHeader = React.createClass({displayName: "EventTableHeader",
  render: function() {
    return (
      React.createElement("thead", null, 
        React.createElement("tr", null, 
          React.createElement("th", {className: "event-name-head"}, "Event name"), 
          React.createElement("th", {className: "event-time-head"}, "Time")
        )
      )
    );
  }
});

var EventTableEntry = React.createClass({displayName: "EventTableEntry",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, React.createElement("a", {href: this.props.url}, this.props.eventName)), 
        React.createElement("td", null, this.props.timeRange)
      )
    );
  }
});

events = [];

var EventsDisplay = React.createClass({displayName: "EventsDisplay",
  render: function() {
    return (
      React.createElement("table", null, 
        React.createElement(EventTableHeader, null), 
        React.createElement("tbody", null, 
          events
        )
      )
    );
  }
});

var condenseEvent = function(event) {
  var fmt = "ddd, MMM DD, h:mma"
  return (
    React.createElement(EventTableEntry, {
      eventName: event.name.text, 
      url: event.url, 
      timeRange: moment(event.start.local).format(fmt) + " to\n" + moment(event.end.local).format(fmt)})
  );
}

var token = "5UTR4NCSQASRGEP5ALUO";
var page = 1;

var getEvents = function(latitude, longitude, radius) {
  $.get("https://www.eventbriteapi.com/v3/events/search/?" +
    "&popular=on" +
    "&location.latitude=" + latitude +
    "&location.longitude=" + longitude +
    "&location.within=" + radius + "mi" +
    "&start_date.keyword=this_weekend" +
    "&page=" + page +
    "&token=" + token,
  function(response) {
    events = response.events.map(condenseEvent);
    renderEvents(response);
  });
};

var renderEvents = function(eventObj) {
  ReactDOM.render(
    React.createElement(EventsDisplay, null),
    document.getElementById("events-display")
  );
};

module.exports = EventsDisplay;
module.exports.getEvents = getEvents;

},{}],2:[function(require,module,exports){
var Locator = React.createClass({displayName: "Locator",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("p", null, "Find popular events happening this weekend within ", /*
        */React.createElement("input", {
          type: "number", 
          min: "1", 
          id: "picker-radius"}), " ", /*
        */"miles of ", /*
        */React.createElement("input", {
          type: "text", 
          placeholder: "address", 
          size: "35", 
          id: "picker-address"})), 

        React.createElement("div", {id: "picker"})
      )
    );
  }
});

module.exports = Locator;

},{}],3:[function(require,module,exports){
var Locator = require("./client/locator.jsx");
var EventsDisplay = require("./client/events_display.jsx");

ReactDOM.render(
  React.createElement(Locator, null),
  document.getElementById("locator")
);

ReactDOM.render(
  React.createElement(EventsDisplay, null),
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

},{"./client/events_display.jsx":1,"./client/locator.jsx":2}]},{},[3]);
