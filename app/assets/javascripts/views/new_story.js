Large.Views.NewStory = Backbone.View.extend({
  template: JST['stories/new_story'],

  events: {
    "submit": "submitForm",
    "click #confirm": "autoSave"
  },

  initialize: function (options) {
    this.collection = options.collection;

    this.publications = options.publications;
    this.listenTo(this.publications, 'sync', this.render);
    this.listenTo(this.model, 'change', this.autoSave)
  },

  render: function () {
    this.$el.html(this.template({ story: this.model, publications: this.publications }));
    return this;
  },

  autoSave: function (model, event) {
    // event.preventDefault();
    var formData = this.$('.story-form').serializeJSON();
    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        this.$('#modal-title').val(this.$('#title').val());
        this.$('#modal-subtitle').val(this.$('#subtitle').val());
      }.bind(this)
    });

  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();

    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate("stories/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
