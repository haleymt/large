Large.Views.NewStoryPreview = Backbone.View.extend({
  template: JST['stories/new_story_preview'],

  events: {
    "click .expand": "expand",
    "click .publish": "createStory"
  },

  initialize: function (options) {
    this.publications = options.publications;
    this.collection = options.collection;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ story: this.model, publications: this.publications }));
    return this;
  },

  createStory: function (event) {
    event.preventDefault();

    this.model.set("title", this.$('#title').text());
    this.model.set("subtitle", this.$('#subtitle').text());
    this.model.set("body", this.$('#story-body').text());

    this.model.save(this.model.attributes, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("stories/" + this.model.id, { trigger: true })
      }.bind(this)
    });
  },

  expand: function () {
    this.model.set("title", this.$('#title').text());
    this.model.set("subtitle", this.$('#subtitle').text());
    this.model.set("body", this.$('#story-body').text());

    var storyNew = new Large.Views.NewStory({
      collection: this.collection,
      model: this.model,
      publications: Large.Collections.publications
    });
    this._currentView && this._currentView.remove();
    this._currentView = storyNew;
    $('#content').html(storyNew.render().$el);
  }
});
