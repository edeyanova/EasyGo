import React from 'react'
import ReactDOM from 'react-dom';

const buttonStyle = {
  display: "inline-block",
  padding: "5px 10px",
  "font-size": "7px",
  cursor: "pointer",
  "text-align": "center",
  "text-decoration": "none",
  outline: "none",
  color: "#fff",
  "background-color": "#0ca3d2",
  border: "none",
  "border-radius": "4px",
  float: "right"
};

const buttonStyleTrips = {
  display: "inline-block",
  padding: "5px 10px",
  "font-size": "9px",
  cursor: "pointer",
  "text-align": "center",
  "text-decoration": "none",
  outline: "none",
  color: "#fff",
  "background-color": "#0ca3d2",
  border: "none",
  "border-radius": "6px"
};

class Panel extends React.Component {
  constructor() {
    super();
    const pan = this;
    manuallyUpdateTripsPanel = function() {
      $.ajax({
        url: '/trips/myTrips/',
        method: 'get',
        success: function (data) {
          pan.state.urls = JSON.parse(data);
          pan.state.show = true;
          pan.setState(pan.state);
        },
        error: function () {
          pan.state.urls = [];
          pan.state.show = false;
          pan.setState(pan.state);
        }
      });
    };
    this.state = {
      minimize: false,
      minimizeStyle: {display: 'block'},
      show: false,
      urls: []
    };
    function updateTripsDescription() {
      $.ajax({
        url: '/trips/myTrips/',
        method: 'get',
        success: function (data) {
          pan.state.urls = JSON.parse(data);
          pan.state.show = true;
          pan.setState(pan.state);
          setTimeout(updateTripsDescription, 3000);
        },
        error: function () {
          pan.state.urls = [];
          pan.state.show = false;
          pan.setState(pan.state);
          setTimeout(updateTripsDescription, 3000);
        }
      });
    }
    updateTripsDescription();
  }
  switchToggle() {
    if (this.state.minimize) {
      this.state.minimize = false;
      this.state.minimizeStyle = {display: 'none'};
    }
    else {
      this.state.minimize = true;
      this.state.minimizeStyle = {display: 'block'};
    }
    this.setState(this.state);
  }
  render() {
    let a = null;
    if (this.state.show) {
      a = this.state.urls.map(trip => <li>
        <a href={trip.url}>{trip.url}</a>
        <button style={buttonStyle} onClick={() => {
            $.ajax({
              url: '/trips/myTrips/' + trip.id,
              method: 'delete',
              success: function() {
                alert("Deleted " + trip.url + "!");
                manuallyUpdateTripsPanel();
              }
            });
          }}>X</button>
      </li>);
    }
    if (a && a.length > 0) {
      return (
        <div class="panel">
             <button style={buttonStyleTrips} onClick={() => this.switchToggle()}>Trips</button>
             <div class="panel-aux" style={this.state.minimizeStyle}>
                <ul>{a}</ul>
             </div>
        </div>);
    }
    return null;
  }
}

let panel = document.getElementById('myTripsPanel');
ReactDOM.render(<Panel />, panel);
