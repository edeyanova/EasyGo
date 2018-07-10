'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buttonStyle = {
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

var buttonStyleTrips = {
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

var Panel = function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel() {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this));

    var pan = _this;
    manuallyUpdateTripsPanel = function manuallyUpdateTripsPanel() {
      $.ajax({
        url: '/trips/myTrips/',
        method: 'get',
        success: function success(data) {
          pan.state.urls = JSON.parse(data);
          pan.state.show = true;
          pan.setState(pan.state);
        },
        error: function error() {
          pan.state.urls = [];
          pan.state.show = false;
          pan.setState(pan.state);
        }
      });
    };
    _this.state = {
      minimize: false,
      minimizeStyle: { display: 'block' },
      show: false,
      urls: []
    };
    function updateTripsDescription() {
      $.ajax({
        url: '/trips/myTrips/',
        method: 'get',
        success: function success(data) {
          pan.state.urls = JSON.parse(data);
          pan.state.show = true;
          pan.setState(pan.state);
          setTimeout(updateTripsDescription, 3000);
        },
        error: function error() {
          pan.state.urls = [];
          pan.state.show = false;
          pan.setState(pan.state);
          setTimeout(updateTripsDescription, 3000);
        }
      });
    }
    updateTripsDescription();
    return _this;
  }

  _createClass(Panel, [{
    key: 'switchToggle',
    value: function switchToggle() {
      if (this.state.minimize) {
        this.state.minimize = false;
        this.state.minimizeStyle = { display: 'none' };
      } else {
        this.state.minimize = true;
        this.state.minimizeStyle = { display: 'block' };
      }
      this.setState(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var a = null;
      if (this.state.show) {
        a = this.state.urls.map(function (trip) {
          return _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              { href: trip.url },
              trip.url
            ),
            _react2.default.createElement(
              'button',
              { style: buttonStyle, onClick: function onClick() {
                  $.ajax({
                    url: '/trips/myTrips/' + trip.id,
                    method: 'delete',
                    success: function success() {
                      alert("Deleted " + trip.url + "!");
                      manuallyUpdateTripsPanel();
                    }
                  });
                } },
              'X'
            )
          );
        });
      }
      if (a && a.length > 0) {
        return _react2.default.createElement(
          'div',
          { 'class': 'panel' },
          _react2.default.createElement(
            'button',
            { style: buttonStyleTrips, onClick: function onClick() {
                return _this2.switchToggle();
              } },
            'Trips'
          ),
          _react2.default.createElement(
            'div',
            { 'class': 'panel-aux', style: this.state.minimizeStyle },
            _react2.default.createElement(
              'ul',
              null,
              a
            )
          )
        );
      }
      return null;
    }
  }]);

  return Panel;
}(_react2.default.Component);

var panel = document.getElementById('myTripsPanel');
_reactDom2.default.render(_react2.default.createElement(Panel, null), panel);