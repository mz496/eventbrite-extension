var Locator = React.createClass({
  render: function() {
    return (
      <div>
        <p>Find popular events happening this weekend within {/*
        */}<input
          type="number"
          min="1"
          id="picker-radius"/> {/*
        */}miles of {/*
        */}<input
          type="text"
          placeholder="address"
          size="35"
          id="picker-address"/></p>

        <div id="picker"></div>
      </div>
    );
  }
});

module.exports = Locator;
