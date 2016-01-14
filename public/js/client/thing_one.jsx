var ThingTwo = require("./thing_two.jsx");

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Begin thing one</h1>
        <ThingTwo />
      </div>
    );
  }
});

