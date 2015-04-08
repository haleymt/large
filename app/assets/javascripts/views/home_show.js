Large.Views.HomeShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  initialize: function (options) {
    this.stories = options.stories;
    this.listenTo(this.stories, 'sync add', this.render)
  },

  render: function () {
    this.$el.html(this.template());

    var newStory = new Large.Models.Story();
    var newStoryView = new Large.Views.NewStory({ collection: this.stories, model: newStory });
    this.$('.new').append(newStoryView.render().$el);

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story });
      this.$('ul').append(storyPreview.render().$el);
    }.bind(this));

    return this;
  }
});
