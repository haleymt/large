Large.Views.NewStory = Backbone.View.extend({
  tagName: 'form',
  template: JST['stories/new_story'],

  events: {
    "submit": "submitForm"
  },

  render: function () {
    this.$el.html(this.template({story: this.model}));
    return this;
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$el.serializeJSON();

    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("stories/" + this.model.id, { trigger: true })
      }
    })
  }
});
