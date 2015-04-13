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
  },

  render: function () {
    debugger
    this.$el.html(this.template({ publications: this.publications }));
    this.$('input[type=submit]').hide();
    return this;
  },

  handleInput: function () {
    var params = this.$('#box').val();
    Backbone.history.navigate("/search?q=" + params, { trigger: true });
  }
});
