Large.Views.StoryPreview = Backbone.View.extend({
  template: JST['stories/story_preview'],
  // tagName: 'li .preview',

  initialize: function (options) {
    this.listenTo(this.model, 'sync add', this.render);
    this.publications = options.publications;

    this.listenTo(Large.Collections.users, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    var authorId = this.model.get('author_id');
    var author = Large.Collections.users.get(authorId);
    if (!author) {
      return this;
    }

    var pubId = this.model.get('pub_id');
    var pub = this.publications.get(pubId);

    var content = this.template({ story: this.model, author: author, pub: pub });
    this.$el.html(content);
    this.$("abbr.timeago").timeago();

    return this;
  }
});
