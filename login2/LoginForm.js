var dd = require("react-dd");
var FormMixin = require("react-loose-forms");
var VerticalFields = require("react-loose-forms.bootstrap3/layouts/VerticalFields");

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

    return dd.form({onSubmit: this.Form_onSubmit},

      VerticalFields({
        fields: this.Form_buildSchema(),
        errors: this.state.errors || {},
        buildInput: this.Form_buildInput
      }),

      VerticalFields.FormButtons({submit_btn_text: "Log in"})
    );
  }
});
