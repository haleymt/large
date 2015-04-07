Large.Views.StoryShow = Backbone.View.extend({
  template: JST['stories/story_show'],

  initialize: function (options) {
    this.story = options.story;
    this.listenTo(this.story, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ story: this.story });
    this.$el.html(content);
    // add NewCard view
    return this;
  },

});
