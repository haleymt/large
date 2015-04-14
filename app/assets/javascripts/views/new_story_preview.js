Large.Views.NewStoryPreview = Backbone.View.extend({
  template: JST['stories/new_story_preview'],

  events: {
    "click .expand": "expand"
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
