import React from 'react'
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'

function getDomain(url) {
  var arr = url.split("/");
  return arr[2];
}

function getAgencyName(url) {
  url = getDomain(url);
  var res = "";
  var arr = url.split(".");
  if(arr[0] === "www") {
    res = arr[1];
  }
  else {
    res = arr[0];
  }
  return res.charAt(0).toUpperCase() + res.slice(1);
}

const buttonStyle = {
  display: "inline-block",
  padding: "5px 10px",
  "font-size": "10px",
  cursor: "pointer",
  "text-align": "center",
  "text-decoration": "none",
  outline: "none",
  color: "#fff",
  "background-color": "#0ca3d2",
  border: "none",
  "border-radius": "7px",
  float: "right"
};

class Trip extends React.Component {
  constructor() {
    super();
    this.state = {
      onUrl: false,
      onIframe: false,
      style: {display: 'none'}
    };
  }
  setStyle() {
    if (this.state.onUrl || this.state.onIframe) {
      var state = this.state;
      state.style = {display: 'block'};
      this.setState(state);
    }
    else {
      var state = this.state;
      state.style = {display: 'none'};
      this.setState(state);
    }
  }
  render() {
    let button = null;
    if (loggedIn) {
      button = <button style={buttonStyle} onClick={() => {$.ajax({
        url:"/trips/myTrips/" + this.props.tripId,
        method:"post",
        success:function(data) {
          alert("The trip is added!");
        }
        })}}>Save</button>;
    }
    return (
      <li>
      <div class="comments">
        <a style={
          {"text-decoration": "none"}
        } 
           href={this.props.url} target="_blank" onMouseOver={() => {
              this.state.onUrl = true;
              this.setStyle();
            }
          } onMouseOut={() => {
              this.state.onUrl = false;
              this.setStyle();
            }
          }>{"Offer from: " + getAgencyName(this.props.url)}</a>
        {button}
        <iframe src={"https://stormy-depths-68741.herokuapp.com/easyGoId/" + this.props.tripId} style={this.state.style} onMouseOver={() => {
            this.state.onIframe = true;
            this.setStyle();
          }}
          onMouseOut={() => {
            this.state.onIframe=false;
            this.setStyle();
          }}></iframe>
      </div>
      <br />
      </li>
    );
  }
}

const TripsSection = ({trips}) => (
  <div class="trips">
    <p><b><i>Here are our top recommendations for your journey: </i></b></p>
    <ul>
      {trips.map(trip => (
       <Trip url={trip.url} tripId={trip._id} />
      ))}
      </ul>
  </div>
);

const app = document.getElementById('app');
ReactDOM.render(<TripsSection trips={trips} />, app);
