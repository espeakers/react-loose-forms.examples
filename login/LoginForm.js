var dd = require("react-dd");
var FormMixin = require("react-loose-forms");

module.exports = dd.createClass({
  mixins: [FormMixin],
  render: function(){
    return dd.form({onSubmit: this.Form_onSubmit},
      "TODO the form"
    );
  }
});
