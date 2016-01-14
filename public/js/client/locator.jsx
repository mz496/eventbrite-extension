module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <p>Enter an address and a radius in miles to find popular events near you! We've attempted to fill it in based on your location.</p>
        <form>
          Address: <input type="text" id="picker-address" />
          Radius (miles): <input type="text" id="picker-radius" />
          Lat: <input type="text" id="picker-lat" />
          Long: <input type="text" id="picker-long" />
        </form>
        <div id="picker"></div>
      </div>
    );
  }
});

