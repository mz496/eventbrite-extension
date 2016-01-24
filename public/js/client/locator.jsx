/* locator.jsx
 * Creates the interface for the location picker controls
 */

var EventsDisplay = require("./events_display.jsx");

var pickerRadiusID = "picker-radius";
var pickerAddressID = "picker-address";
//var timeframe = "this_weekend";


var Locator = React.createClass({
  timeframeChanged: function(e) {
    var selected = Array.prototype.filter.
    call(e.target.options, i => i.selected).
    map(i => i.value)[0];

    var pickerState = $("#picker").locationpicker("map");
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
      <div>
        <p>Find popular events happening {/*

        */}<select
          id="timeframe"
          defaultValue="this_weekend"
          onChange={this.timeframeChanged}>
            <option value="today">today</option>
            <option value="this_weekend">this weekend</option>
            <option value="this_week">this week</option>
            <option value="this_month">this month</option>
        </select> {/*

        */}within {/*
        
        */}<input
          type="number"
          min="1"
          id={pickerRadiusID}/> {/*
        
        */}miles of {/*
        
        */}<input
          type="text"
          placeholder="Address"
          size="40"
          id={pickerAddressID}/></p>

        <div id="picker"></div>
      </div>
    );
  }
});

var renderLocator = function() {
  ReactDOM.render(
    <Locator />,
    document.getElementById("locator")
  );
};

var getSelectedTimeframe = function() {
  return Array.prototype.filter.
    call(jQuery.makeArray($("select#timeframe option")), i => i.selected).
    map(i => i.value)[0];
}


// Expose the following variables for initializing and rendering from main
module.exports = Locator;
module.exports.renderLocator = renderLocator;
module.exports.pickerRadiusID = pickerRadiusID;
module.exports.pickerAddressID = pickerAddressID;
module.exports.getSelectedTimeframe = getSelectedTimeframe;
