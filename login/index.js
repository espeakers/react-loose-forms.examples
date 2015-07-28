var dd = require("react-dd");
var React = require("react");
var LoginForm = require("./LoginForm");

var App = dd.createClass({
  render: function(){
    return dd.div({style: {margin: "50px", width: 500}},
      dd.div({className: "well"},
        dd.h3({style: {marginTop: 0}}, "ACME login"),

        LoginForm()
      )
    );
  }
});

require("../bootstrap.min.css");
React.render(App(), document.body);
