Large.Views.StoryPreview = Backbone.View.extend({
  template: JST['stories/story_preview'],
  // tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, 'sync add', this.render);
    this.listenTo(Large.Collections.users, 'sync', this.render);
  },

  render: function () {
    var authorId = this.model.get('author_id');
    var author = Large.Collections.users.get(authorId);
    if (!author) {
      return this;
    }
    var content = this.template({ story: this.model, author: author });
    this.$el.html(content);
    this.$("abbr.timeago").timeago();

    return this;
  }
});
