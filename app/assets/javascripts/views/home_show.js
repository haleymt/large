Large.Views.HomeShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  initialize: function (options) {
    this.stories = options.stories;
    this.listenTo(this.stories, 'sync', this.render)
  },

  render: function () {
    var content = this.template({ stories: this.stories });
    this.$el.html(content);

    var newStory = new Large.Models.Story();
    var newStoryView = new Large.Views.NewStory({ collection: this.stories, model: newStory });

    this.$('.new').append(newStoryView.render().$el);

    return this;
  }
});
