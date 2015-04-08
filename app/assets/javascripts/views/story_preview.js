Large.Views.StoryPreview = Backbone.View.extend({
  template: JST['stories/story_preview'],
  // tagName: 'li',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var authorId = this.model.get('author_id');
    var author = Large.Collections.users.getOrFetch(authorId);
    var content = this.template({ story: this.model, author: author });
    this.$el.html(content);
    $("abbr.timeago").timeago();
    return this;
  }
});
