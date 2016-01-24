/* events_display.jsx
 * Creates the list of events in range as a result of the API call
 */

// The default current page
var page = 1;
// The default page count
var pageCount = 1;
// The global event array we use to store API results
var events = [];
// Saving API call string for future queries
var recordAPIcall = "";
// Eventbrite API key
var token = "5UTR4NCSQASRGEP5ALUO";



// A single event row in the output
var EventEntry = React.createClass({
  linkClick: function() {
    chrome.tabs.create({ url: this.props.url });
  },
  render: function() {
    return (
      <a className="event-entry"
        onClick={this.linkClick}>
        <div>
        <div className="event-time">
          {this.props.timeRange}
        </div>
        <div className="event-title">
          {this.props.eventName}
        </div>
        </div>
      </a>
    );
  }
});

// The container for all the EventEntry's
var EventsDisplay = React.createClass({
  nextPage: function() {
    page += 1;
    getEventsByAPIcall(recordAPIcall, page);
  },
  render: function() {
    return (
      <div>
      {events}

      <a
        style={{"display": noMoreEvents() ? "none" : "block"}}
        className="load-more"
        onClick={this.nextPage}>
        Load more
      </a>

      <div
        style={{"display": noMoreEvents() ? "block" : "none"}}
        className="no-more-events">
        (No more events)
      </div>

      <div id="events-loading-overlay">
      </div>
      
      </div>
    );
  }
});

/* Mapping function that takes in an API response and returns an EventEntry
 * using only the parameters we need from the event
 */
var condenseEvent = function(event) {
  var fmt = "ddd, MMM D h:mm A";
  return (
    <EventEntry
      eventName={event.name.text}
      url={event.url}
      timeRange={moment(event.start.local).format(fmt)}
      key={event.name.text} />
  );
}

/* Returns true if there are no more events to show (either we ran out
 * or the response was empty)
 */
var noMoreEvents = function() {
  return pageCount === 0 || pageCount >= page;
}

var showLoadingOverlay = function() {
  console.log("SHOW");
  $("#events-loading-overlay").css("display","block");
}
var hideLoadingOverlay = function() {
  console.log("HIDE");
  $("#events-loading-overlay").css("display","none");
}




// Get the events from Eventbrite API
var getEvents = function(latitude, longitude, radius, timeframe, page) {
  var APIcall = "https://www.eventbriteapi.com/v3/events/search/?" +
    "&popular=on" +
    "&location.latitude=" + latitude +
    "&location.longitude=" + longitude +
    "&location.within=" + radius + "mi" +
    "&start_date.keyword=" + timeframe +
    "&token=" + token;

  recordAPIcall = APIcall;
  getEventsByAPIcall(APIcall, page);
}

var getEventsByAPIcall = function(APIcall, page) {
  showLoadingOverlay();
  $.get(APIcall + "&page=" + page,
  function(response) {
    pageCount = response.pagination.page_count;
    events = events.concat(response.events.map(condenseEvent));
    renderEventsDisplay();
    hideLoadingOverlay();
  });
};

var renderEventsDisplay = function() {
  ReactDOM.render(
    <EventsDisplay />,
    document.getElementById("events-display")
  );
};

/* Reset variables to their original values to start anew for each update
 * to the position/radius
 */
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