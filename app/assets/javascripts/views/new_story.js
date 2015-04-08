Large.Views.NewStory = Backbone.View.extend({
  template: JST['stories/new_story'],

  events: {
    "submit": "submitForm"
  },

  initialize: function (options) {
    this.collection = options.collection;
  
    this.publications = options.publications;
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ story: this.model, publications: this.publications }));
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();

    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("stories/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
