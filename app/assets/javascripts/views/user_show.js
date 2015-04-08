Large.Views.UserShow = Backbone.View.extend({
  template: JST['users/user_show'],

  initialize: function (options) {
    this.user = options.user;
    this.stories = this.user.stories();
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.stories, 'add', this.render);
  },

  render: function () {
    var content = this.template({ user: this.user, stories: this.stories });
    this.$el.html(content);

    return this;
  }
});
