Large.Views.YourStories = Backbone.View.extend({
  template: JST['stories/your_stories'],

  initialize: function (options) {
    this.user = options.user;
    this.publications = options.publications;

    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    var user = this.user.first();
    if (user !== undefined) {
      var stories = user.stories();
    }
    var content = this.template({
      stories: stories,
      pubs: this.publications
    });
    this.$el.html(content);
    return this;
  }
});
