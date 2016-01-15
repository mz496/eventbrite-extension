var page = 1;
var pageCount = 1;
var events = [];
var recordAPIcall = "";



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
  nextPage: function() {
    page += 1;
    getEvents(recordAPIcall, page);
  },
  render: function() {
    return (
      <div>
      <table>
        <tbody>
          {events}
        </tbody>
      </table>
      <a
        style={{"display": noMoreEvents() ? "none" : "block"}}
        className="load-more"
        onClick={this.nextPage}>
        Load more
      </a>
      </div>
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

var noMoreEvents = function() {
  return pageCount === page;
}


var getEvents = function(APIcall, page) {
  recordAPIcall = APIcall;
  $.get(APIcall + "&page=" + page,
  function(response) {
    pageCount = response.pagination.page_count;
    events = events.concat(response.events.map(condenseEvent));
    renderEventsDisplay();
  });
};

var renderEventsDisplay = function() {
  ReactDOM.render(
    <EventsDisplay />,
    document.getElementById("events-display")
  );
};

var flushValues = function() {
  page = 1;
  pageCount = 1;
  events = [];
  recordAPIcall = "";
}

// Expose the following functions to render and refresh the events display
module.exports = EventsDisplay;
module.exports.getEvents = getEvents;
module.exports.flushValues = flushValues;