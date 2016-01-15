var EventTableHeader = React.createClass({
  render: function() {
    return (
      <thead>
        <tr>
          <th className="event-name-head">Event name</th>
          <th className="event-time-head">Time</th>
        </tr>
      </thead>
    );
  }
});

var EventTableEntry = React.createClass({
  render: function() {
    return (
      <tr>
        <td><a href={this.props.url}>{this.props.eventName}</a></td>
        <td>{this.props.timeRange}</td>
      </tr>
    );
  }
});

events = [];

var EventsDisplay = React.createClass({
  render: function() {
    return (
      <table>
        <EventTableHeader />
        <tbody>
          {events}
        </tbody>
      </table>
    );
  }
});

var condenseEvent = function(event) {
  var fmt = "ddd, MMM DD, h:mma"
  return (
    <EventTableEntry
      eventName={event.name.text}
      url={event.url}
      timeRange={moment(event.start.local).format(fmt) + " to\n" + moment(event.end.local).format(fmt)} />
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
    <EventsDisplay />,
    document.getElementById("events-display")
  );
};

module.exports = EventsDisplay;
module.exports.getEvents = getEvents;
