(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("h1", null, "Events Display")
    );
  }
});

},{}],2:[function(require,module,exports){
//var ThingTwo = require("./thing_two.jsx");

module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Locator")
      )
    );
  }
});

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

$("#location-picker").locationpicker();

},{"./client/events_display.jsx":1,"./client/locator.jsx":2}]},{},[3]);
