Large.Views.StoryPreview = Backbone.View.extend({
  template: JST['stories/story_preview'],
  inResponse: JST['stories/_in_response_link'],

  initialize: function (options) {
    this.publications = options.publications;
    this.stories = options.stories;
    this.allUsers = options.allUsers;

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.stories, 'sync', this.render);
    this.listenTo(Large.Collections.users, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    var authorId = this.model.get('author_id');
    var author = this.allUsers ? this.allUsers.get(authorId) || Large.Collections.users.get(authorId) : Large.Collections.users.get(authorId);
    // if (!author) {
    //   return this;
    // }
    var pubId = this.model.get('pub_id');
    var pub = this.publications.get(pubId);

    if ((this.model.get('body') === null) || (this.model.get("body").split('</p>').length < 3)) {
      var firstSentence = "";
      var readingTime = "Less than a";
    } else if (this.model.get('story_id') !== null) {
      var b = this.model.get('body');
      var firstSentence = b.split('</p>')[0].split(">")[b.split('</p>')[0].split(">").length - 1]
      readingTime = Math.floor(this.model.get('body').length / 2800);
      if (readingTime === 0) {
        readingTime = "Less than a";
      }
    } else {
      var b = this.model.get('body');
      var firstSentence = b.split('</p>')[2].split(">")[b.split('</p>')[2].split(">").length - 1]
      readingTime = Math.floor(this.model.get('body').length / 2800);
      if (readingTime === 0) {
        readingTime = "Less than a";
      }
    }

    var content = this.template({
      story: this.model,
      author: author,
      authorId: authorId,
      pub: pub,
      sentence: firstSentence.slice(0, 250),
      readingTime: readingTime
    });

    this.$el.html(content);
    this.$("abbr.timeago").timeago();

    var responseId = this.model.get('story_id')
    var response = this.stories.get(responseId);

    if (response !== undefined) {
      this.$('.in-response').html(this.inResponse({response: response}));
    }

    return this;
  }
});
