'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDomain(url) {
  var arr = url.split("/");
  return arr[2];
}

function getAgencyName(url) {
  url = getDomain(url);
  var res = "";
  var arr = url.split(".");
  if (arr[0] === "www") {
    res = arr[1];
  } else {
    res = arr[0];
  }
  return res.charAt(0).toUpperCase() + res.slice(1);
}

var buttonStyle = {
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

var Trip = function (_React$Component) {
  _inherits(Trip, _React$Component);

  function Trip() {
    _classCallCheck(this, Trip);

    var _this = _possibleConstructorReturn(this, (Trip.__proto__ || Object.getPrototypeOf(Trip)).call(this));

    _this.state = {
      onUrl: false,
      onIframe: false,
      style: { display: 'none' }
    };
    return _this;
  }

  _createClass(Trip, [{
    key: 'setStyle',
    value: function setStyle() {
      if (this.state.onUrl || this.state.onIframe) {
        var state = this.state;
        state.style = { display: 'block' };
        this.setState(state);
      } else {
        var state = this.state;
        state.style = { display: 'none' };
        this.setState(state);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var button = null;
      if (loggedIn) {
        button = _react2.default.createElement(
          'button',
          { style: buttonStyle, onClick: function onClick() {
              $.ajax({
                url: "/trips/myTrips/" + _this2.props.tripId,
                method: "post",
                success: function success(data) {
                  alert("The trip is added!");
                }
              });
            } },
          'Save'
        );
      }
      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'div',
          { 'class': 'comments' },
          _react2.default.createElement(
            'a',
            { style: { "text-decoration": "none" },
              href: this.props.url, target: '_blank', onMouseOver: function onMouseOver() {
                _this2.state.onUrl = true;
                _this2.setStyle();
              }, onMouseOut: function onMouseOut() {
                _this2.state.onUrl = false;
                _this2.setStyle();
              } },
            "Offer from: " + getAgencyName(this.props.url)
          ),
          button,
          _react2.default.createElement('iframe', { src: "/proxy/" + this.props.tripId, style: this.state.style, onMouseOver: function onMouseOver() {
              _this2.state.onIframe = true;
              _this2.setStyle();
            },
            onMouseOut: function onMouseOut() {
              _this2.state.onIframe = false;
              _this2.setStyle();
            } })
        ),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return Trip;
}(_react2.default.Component);

var TripsSection = function TripsSection(_ref) {
  var trips = _ref.trips;
  return _react2.default.createElement(
    'div',
    { 'class': 'trips' },
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'b',
        null,
        _react2.default.createElement(
          'i',
          null,
          'Here are our top recommendations for your journey: '
        )
      )
    ),
    _react2.default.createElement(
      'ul',
      null,
      trips.map(function (trip) {
        return _react2.default.createElement(Trip, { url: trip.url, tripId: trip._id });
      })
    )
  );
};

var app = document.getElementById('app');
_reactDom2.default.render(_react2.default.createElement(TripsSection, { trips: trips }), app);