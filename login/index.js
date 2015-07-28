var dd = require("react-dd");
var React = require("react");
require("../bootstrap.min.css");
require("react-loose-forms.bootstrap3").install();

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

React.render(App(), document.body);
