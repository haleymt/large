Large.Views.NewPub = Backbone.View.extend({
  template: JST['publications/new_pub'],

  events: {
    "submit": "submitForm"
  },

  initialize: function (options) {
    this.collection = options.collection;
  },

  render: function () {
    this.$el.html(this.template({ publication: this.model }));
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();
    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("publications/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
