Large.Views.HomeShow = Backbone.View.extend({
  template: JST['feeds/feed_show'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory"
  },

  initialize: function (options) {
    this.stories = options.stories;
    this.publications = options.publications;
    this.listenTo(this.stories, 'sync add', this.render);
  },

  render: function () {
    this.$el.html(this.template());

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story, publications: this.publications });
      this.$('ul').prepend(storyPreview.render().$el);
    }.bind(this));
    this.$("abbr.timeago").timeago();

    var newStory = new Large.Models.Story();
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    var newStoryView = new Large.Views.NewStory({ collection: this.stories, model: newStory, publications: Large.Collections.publications });
    this.$('.post-click').prepend(newStoryView.render().$el);

    return this;
  },

  showNewStory: function () {
    this.$('.post-click').css('display', 'block');
    this.$('.pre-click').css('display', 'none');
  },

  hideNewStory: function () {
    this.$('.post-click').css('display', 'none');
    this.$('.pre-click').css('display', 'block');
  }
});
