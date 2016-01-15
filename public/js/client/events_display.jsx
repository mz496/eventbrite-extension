var token = "5UTR4NCSQASRGEP5ALUO";
var index = 0;
var object_count = 0;
var perPage = 50;
var maxDisplayed = 5;
var events = [];
var visibleEvents = [];

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

var EventsDisplay = React.createClass({
  backPage: function() {
    if (index - maxDisplayed >= 0) {
      index -= maxDisplayed;
    }
    visibleEvents = events.slice(index, index+maxDisplayed);
  },
  nextPage: function() {
    if (events.)
  },
  render: function() {
    return (
      <table>
        <tbody>
          {visibleEvents}
        </tbody>
      </table>
      <a onClick={this.backPage}>back</a>
      <a onClick={this.nextPage}>next</a>
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

var convertIndexToPage = function(index, perPage) {
  if (perPage !== 0) {
    return Math.floor(index / perPage) + 1;
  }
}
var getIndexWithinPage = function(index, perPage) {
  if (perPage !== 0) {
    return index % perPage;
  }
}



var getEvents = function(latitude, longitude, radius) {
  $.get("https://www.eventbriteapi.com/v3/events/search/?" +
    "&popular=on" +
    "&location.latitude=" + latitude +
    "&location.longitude=" + longitude +
    "&location.within=" + radius + "mi" +
    "&start_date.keyword=this_weekend" +
    "&page=" + convertIndexToPage(index, perPage) +
    "&token=" + token,
  function(response) {
    events = response.events.map(condenseEvent);
    object_count = response.pagination.object_count;
    visibleEvents = events.slice(index, index+maxDisplayed);
    renderEventsDisplay();
  });
};

var renderEventsDisplay = function() {
  ReactDOM.render(
    <EventsDisplay />,
    document.getElementById("events-display")
  );
};

// Expose the following functions to render and refresh the events display
module.exports = EventsDisplay;
module.exports.getEvents = getEvents;