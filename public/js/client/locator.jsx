/* locator.jsx
 * Creates the interface for the location picker controls
 */

var pickerRadiusID = "picker-radius";
var pickerAddressID = "picker-address";

var Locator = React.createClass({
  render: function() {
    return (
      <div>
        <p>Find popular events happening this weekend within {/*
        
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

// Expose the following variables for initializing and rendering from main
module.exports = Locator;
module.exports.renderLocator = renderLocator;
module.exports.pickerRadiusID = pickerRadiusID;
module.exports.pickerAddressID = pickerAddressID;
