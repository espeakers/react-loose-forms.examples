var dd = require("react-dd");
var React = require("react");
require("../bootstrap.min.css");
require("react-loose-forms.bootstrap3").install(require("react-loose-forms/InputTypes"));

var LoginForm = require("./LoginForm");

var App = dd.createClass({
  __handleLoginSubmit: function(data){

    console.log("TODO login", data.username, data.password);

  },
  render: function(){
    return dd.div({style: {margin: "50px", width: 500}},
      dd.div({className: "well"},
        dd.h3({style: {marginTop: 0}}, "ACME login"),

        LoginForm({onSubmit: this.__handleLoginSubmit})
      )
    );
  }
});

React.render(App(), document.body);
