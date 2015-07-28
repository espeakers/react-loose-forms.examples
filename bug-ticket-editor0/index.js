var _ = require("lodash");
var dd = require("react-dd");
var React = require("react");
require("../bootstrap.min.css");
require("react-loose-forms.bootstrap3").install(require("react-loose-forms/InputTypes"));

var TicketForm = require("./TicketForm");

var App = dd.createClass({
  getInitialState: function(){
    return {
      opened_ticket_id: null,
      tickets: _.object(_.map([
        {product: "Dehydrated Boulders", description: "When I opened your box, they fell into my glass of water... as a result I broke both my legs :(", date: "2015 Jul 27", level: "High"},
        {product: "Jet-Propelled Unicycle", description: "The jet's were installed backwards!", date: "2015 Jul 28", level: "High"},
        {product: "DIY Tornado Kit", description: "I planted 10 tornado seeds in my neighbors yard, but 3 of them attacked my house!", date: "2015 Jul 26", level: "Medium"},
        {product: "Earthquake Pills", description: "I ate them, but it didn't do anything!?!?", date: "2015 Jul 25", level: "Low"},
        {product: "Iron Carrot", description: "I chipped my tooth!", date: "2015 Jul 25", level: "Low"}
      ], function(t, i){
        var t2 = _.assign({id: "111" + i}, t);
        return [t2.id, t2];
      }))
    };
  },
  __saveTicket: function(data){
    console.log(JSON.stringify(data, false, 2));

    var opened_ticket_id = this.state.opened_ticket_id;
    var opened_ticket = this.state.tickets[opened_ticket_id];

    if(opened_ticket){
      this.setState({tickets: _.assign(this.state.tickets, _.object([
        [opened_ticket_id, _.assign(opened_ticket, data)]
      ]))});
    }else{
      var new_id = _.uniqueId("new");
      this.setState({tickets: _.assign(this.state.tickets, _.object([
        [new_id, _.assign(data, {id: new_id, date: "today"})]
      ]))});
    }
  },
  __openTicketOnClick: function(id){
    var self = this;
    return function(e){
      e.preventDefault();
      self.setState({opened_ticket_id: id});
    };
  },
  render: function(){
    var tickets = this.state.tickets;
    var opened_ticket_id = this.state.opened_ticket_id;
    var opened_ticket = tickets[opened_ticket_id];

    return dd.div({className: "container-fluid"},

      dd.h1(null, "ACME Bug Tracker"),

      dd.div({className: "row"},
        dd.div({className: "col-sm-6"},

          dd.table({className: "table"},
            dd.thead(null,
              dd.tr(null,
                dd.th(null, "Date"),
                dd.th(null, "Product"),
                dd.th(null, "Description"),
                dd.th(null, "Level")
              )
            ),
            dd.tbody(null,
              _.map(tickets, function(ticket, id){
                var is_open = opened_ticket && (opened_ticket.id === id);
                return dd.tr({key: id, onClick: this.__openTicketOnClick(id), className: is_open ? "active" : null},
                  dd.td(null, dd[is_open ? "b" : "span"](null, ticket.date)),
                  dd.td(null, dd[is_open ? "b" : "span"](null, ticket.product)),
                  dd.td(null, dd[is_open ? "b" : "span"](null, ticket.description)),
                  dd.td(null, dd[is_open ? "b" : "span"](null, ticket.level))
                );
              }, this)
            )
          )
        ),
        opened_ticket ? dd.div({className: "col-sm-6"},
          dd.div({style: {width: 500}},
            dd.div({className: "well"},
              dd.h3({style: {marginTop: 0}},
                "Ticket #" + opened_ticket.id,
                dd.small({className: "pull-right"}, opened_ticket.date)
              ),

              TicketForm({
                onSubmit: this.__saveTicket,
                ticket: opened_ticket
              })
            )
          )
        ) : null
      )
    );
  }
});

React.render(App(), document.body);
