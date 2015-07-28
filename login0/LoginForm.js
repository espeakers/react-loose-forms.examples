var dd = require("react-dd");
var FormMixin = require("react-loose-forms");

module.exports = dd.createClass({
  mixins: [FormMixin],
  buildSchema: function(){
    return {
      username: {
        type: "text",
        placeholder: "Username"
      },
      password: {
        type: "password",
        placeholder: "Password"
      }
    };
  },
  render: function(){
    var fields = this.Form_buildSchema();

    return dd.form({onSubmit: this.Form_onSubmit},

      dd.div(null,
        this.Form_buildInput(fields["username"])
      ),


      dd.div(null,
        this.Form_buildInput(fields["password"])
      ),


      dd.div(null,
        dd.button({type: "submit"}, "log in")
      )
    );
  }
});
