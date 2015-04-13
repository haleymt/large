Large.Views.SearchShow = Backbone.View.extend({
  template: JST['search/search_show'],

  events: {
    "submit": "handleInput"
  },

  initialize: function (options) {
    this.params = options.params;
    this.publications = options.publications;
    this.users = options.users;
    this.stories = options.stories;
    this.listenTo(this.publications, 'sync', this.render);
    this.listenTo(this.users, 'sync', this.render);
    this.listenTo(this.stories, 'sync', this.render);
  },

  render: function () {
    // debugger
    this.$el.html(this.template({ params: this.params, publications: this.publications, stories: this.stories, users: this.users }));
    this.$('input[type=submit]').hide();
    return this;
  },

  handleInput: function () {
    var params = this.$('#box').val();
    Backbone.history.navigate("/search?q=" + params, { trigger: true });
  }
});
