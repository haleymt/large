Large.Routers.UsersRouter = Backbone.Router.extend({
  routes: {
    "users/:id": "userShow",
    "users/:id/edit": "userEdit"
  },

  initialize: function (options) {
    Large.Collections.users.fetch();
    this.$rootEl = options.content;
  },

  userShow: function (id) {
    Large.Collections.publications.fetch({
      data: { current_user: false }
    });
    var user = Large.Collections.users.getOrFetch(id);
    var showUser = new Large.Views.UserShow({
      user: user,
      publications: Large.Collections.publications
    });
    this._swapView(showUser);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
