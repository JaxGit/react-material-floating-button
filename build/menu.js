"use strict";

var React = require("react");

var getClasses = require("./utils/get-classes");
var getChildren = require("./utils/get-children");
var childrenValidator = require("./utils/children-validator");

var Menu = React.createClass({
  displayName: "Menu",

  propTypes: {
    effect: React.PropTypes.oneOf(["zoomin", "slidein", "slidein-spring", "fountain"]).isRequired,
    position: React.PropTypes.oneOf(["tl", "tr", "bl", "br"]).isRequired,
    children: childrenValidator
  },

  getInitialState: function getInitialState() {
    return {
      isOpen: false
    };
  },

  toggleMenu: function toggleMenu(evt) {
    evt.preventDefault();

    // flip the state from open to close and viceversa
    this.setState({
      isOpen: !this.state.isOpen
    });
  },

  render: function render() {
    var _this = this;

    var classes = getClasses(this.props);
    var buttons = getChildren(this.props.children);

    var main = buttons.main && React.cloneElement(buttons.main, {
      onClick: function (evt) {
        buttons.main.props.onClick();
        if (_this.props.method === "click" && buttons.child) {
          _this.toggleMenu(evt);
        }
      }
    });

    return React.createElement(
      "ul",
      { className: classes,
        "data-mfb-toggle": this.props.method,
        "data-mfb-state": this.state.isOpen ? "open" : "closed" },
      React.createElement(
        "li",
        { className: "mfb-component__wrap" },
        main,
        React.createElement(
          "ul",
          { className: "mfb-component__list" },
          buttons.child
        )
      )
    );
  }
});

module.exports = Menu;