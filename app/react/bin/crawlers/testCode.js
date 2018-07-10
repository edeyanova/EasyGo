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
  padding: "15px 25px",
  "font-size": "12px",
  cursor: "pointer",
  "text-align": "center",
  "text-decoration": "none",
  outline: "none",
  color: "#fff",
  "background-color": "#0ca3d2",
  border: "none",
  "border-radius": "15px"
};

var TestCrawlers = function (_React$Component) {
  _inherits(TestCrawlers, _React$Component);

  function TestCrawlers() {
    _classCallCheck(this, TestCrawlers);

    var _this = _possibleConstructorReturn(this, (TestCrawlers.__proto__ || Object.getPrototypeOf(TestCrawlers)).call(this));

    _this.state = { result: "" };
    return _this;
  }

  _createClass(TestCrawlers, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', { type: 'text', onChange: function onChange(e) {
              _this2.state.url = e.target.value;
            } })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('textarea', { rows: '20', cols: '50', onChange: function onChange(e) {
              return _this2.state.code = e.target.value;
            } }),
          _react2.default.createElement('textarea', { rows: '20', cols: '50', value: this.state.result })
        ),
        _react2.default.createElement(
          'button',
          { style: buttonStyle, onClick: function onClick() {
              var ref = _this2;
              $.ajax({
                url: '/crawlers',
                method: 'post',
                data: _this2.state,
                success: function success(data) {
                  var state = ref.state;
                  state.result = data;
                  ref.setState(state);
                }
              });
            } },
          'Test code'
        ),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return TestCrawlers;
}(_react2.default.Component);

var app = document.getElementById("app");
_reactDom2.default.render(_react2.default.createElement(TestCrawlers, null), app);