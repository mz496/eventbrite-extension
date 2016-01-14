(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ThingTwo = require("./thing_two.jsx");

module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, "Begin thing one"), 
        React.createElement(ThingTwo, null)
      )
    );
  }
});

},{"./thing_two.jsx":2}],2:[function(require,module,exports){
module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("h1", null, "Thing Two")
    );
  }
});

},{}],3:[function(require,module,exports){
var ThingOne = require("./client/thing_one.jsx")

ReactDOM.render(
  React.createElement(ThingOne, null),
  document.getElementById('content')
);

},{"./client/thing_one.jsx":1}]},{},[3]);
