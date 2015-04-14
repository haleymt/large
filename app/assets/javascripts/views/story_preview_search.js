Large.Views.StoryPreviewSearch = Backbone.View.extend({
  template: JST['stories/story_preview_search'],

  initialize: function (options) {
    this.publications = options.publications;
    this.listenTo(Large.Collections.users, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
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
    // if (this.model.get('header_image') !== null) {
    //   this.$el.css('height', '450px');
    //   this.$('.sub-preview').css('margin-top', '250px');
    // }
    this.$("abbr.timeago").timeago();

    return this;
  }
});
