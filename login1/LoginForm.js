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
        placeholder: "Password",
        validate: function(v){
          if(!v || v.length === 0){
            return "Please enter your password";
          }
          if(v.length < 8){
            return "Passwords must be at least 8 characters long";
          }
          return true;
        }
      }
    };
  },
  render: function(){
    var fields = this.Form_buildSchema();
    var errors = this.state.errors || {};

    return dd.form({onSubmit: this.Form_onSubmit},

      dd.div(null,
        this.Form_buildInput(fields["username"]),

        errors["username"] ? dd.b(null, "Error: ", errors["username"]) : null
      ),


      dd.div(null,
        this.Form_buildInput(fields["password"]),

        errors["password"] ? dd.b(null, "Error: ", errors["password"]) : null
      ),


      dd.div(null,
        dd.button({type: "submit"}, "log in")
      )
    );
  }
});
