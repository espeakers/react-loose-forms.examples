var dd = require("react-dd");
var FormMixin = require("react-loose-forms");
var VerticalFields = require("react-loose-forms.bootstrap3/layouts/VerticalFields");

module.exports = dd.createClass({
  mixins: [FormMixin],
  getInitialValues: function(props){
    var ticket = props.ticket;
    return {
      product: ticket.product,
      description: ticket.description,
      level: ticket.level
    };
  },
  buildSchema: function(){
    return {
      product: {
        label: "Product",
        type: "text"
      },
      description: {
        label: "Description",
        type: "textarea"
      },
      level: {
        label: "Level",
        type: "select",
        options: {
          High: "High (bodily injury)",
          Medium: "Medium (property damange)",
          Low: "Low (no crying was involved)"
        }
      }
    };
  },
  render: function(){
    var where_changes_made = this.Form_areChangesMade();

    return dd.form({onSubmit: this.Form_onSubmit},

      VerticalFields({
        fields: this.Form_buildSchema(),
        errors: this.state.errors || {},
        buildInput: this.Form_buildInput
      }),

      VerticalFields.FormButtons({
        submit_btn_text: "Save"
      })
    );
  }
});
