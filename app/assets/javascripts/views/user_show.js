Large.Views.UserShow = Backbone.View.extend({
  template: JST['users/user_show'],

  initialize: function (options) {
    this.user = options.user;
    this.stories = this.user.stories();
    this.publications = options.publications;
    this.listenTo(this.stories, 'sync add', this.render);
    this.listenTo(this.publications, 'sync', this.render);

  },

  render: function () {
    var content = this.template({ user: this.user });
    this.$el.html(content);

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story, publications: this.publications });
      this.$('ul.user-stories').append(storyPreview.render().$el);
    }.bind(this));
    return this;
  }
});
