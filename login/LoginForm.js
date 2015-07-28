var dd = require("react-dd");
var FormMixin = require("react-loose-forms");

module.exports = dd.createClass({
  mixins: [FormMixin],
  buildSchema: function(){
    return {
      username: {
        type: "text"
      },
      password: {
        type: "password"
      }
    };
  },
  render: function(){
    var fields = this.buildSchema();
    var errors = this.state.errors || {};

    return dd.form({onSubmit: this.Form_onSubmit},

      Form_buildInput(fields, "username"),
      Form_buildInput(fields, "password"),

      dd.button({type: "submit"}, "log in")

    );
  }
});
