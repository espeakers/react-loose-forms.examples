var dd = require("react-dd");
var FormMixin = require("react-loose-forms");
var VerticalFields = require("react-loose-forms.bootstrap3/layouts/VerticalFields");

module.exports = dd.createClass({
  mixins: [FormMixin],
  getInitialValuesSourceVersion: function(props){
    var ticket = props.ticket;
    return ticket.id + "@" + ticket.date;
  },
  getInitialValues: function(props){
    var ticket = props.ticket;
    return {
      product: ticket.product,
      description: ticket.description,
      level: ticket.level
    };
  },
  buildSchema: function(){
    var data = this.state.data;

    var schema = {
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

    if(data.level === "High"){
      schema.did_you_send_flowers = {
        label: "Did you send flowers?",
        type: "select",
        options: {
          yes: "Yes",
          no: "No"
        }
      };
    }
    if(data.did_you_send_flowers === "no"){
      schema.why_no_flowers = {
        label: "Why didn't you send flowers?",
        type: "textarea"
      };
    }

    return schema;
  },
  __reset: function(e){
    e.preventDefault();
    this.Form_reset();
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
        submit_btn_text: "Save",
        onDiscard: where_changes_made ? this.__reset : null
      })
    );
  }
});
