var EventTableEntry = React.createClass({
  render: function() {
    return (
      <tr>
        <td>
        <a href={this.props.url}>
          <span className="event-time">
            {this.props.timeRange}
          </span>
          <br />
          <span className="event-title">
            {this.props.eventName}
          </span>
        </a>
        </td>
      </tr>
    );
  }
});

events = [];

var EventsDisplay = React.createClass({
  render: function() {
    return (
      <table>
        <tbody>
          {events}
        </tbody>
      </table>
    );
  }
});

var condenseEvent = function(event) {
  var fmt = "ddd, MMM D h:mm A"
  return (
    <EventTableEntry
      eventName={event.name.text}
      url={event.url}
      timeRange={moment(event.start.local).format(fmt)}
      key={event.name.text} />
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
    renderEventsDisplay(response);
  });
};

var renderEventsDisplay = function(eventObj) {
  ReactDOM.render(
    <EventsDisplay />,
    document.getElementById("events-display")
  );
};

module.exports = EventsDisplay;
module.exports.getEvents = getEvents;
module.exports.renderEventsDisplay = renderEventsDisplay;
