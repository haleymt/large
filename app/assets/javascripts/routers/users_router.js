Large.Routers.UsersRouter = Backbone.Router.extend({
  routes: {
    "users/:id": "userShow",
    "users/:id/edit": "userEdit"
    // "users/:id/your_stories": "yourStories"
  },

  initialize: function (options) {
    Large.Collections.users.fetch();
    this.$rootEl = options.content;
  },

  userShow: function (id) {
    Large.Collections.publications.fetch({
      data: { current_user: false }
    });
    Large.Collections.follows.fetch({
      data: { current_user: true }
    });

    var user = Large.Collections.users.getOrFetch(id);
    Large.Collections.users.fetch({
      data: { current_user: true }
    });
    var showUser = new Large.Views.UserShow({
      user: user,
      currentUser: Large.Collections.users,
      publications: Large.Collections.publications,
      follows: Large.Collections.follows
    });
    this._swapView(showUser);
  },

  userEdit: function (id) {
    Large.Collections.publications.fetch({
      data: { current_user: false }
    });
    Large.Collections.follows.fetch({
      data: { current_user: true }
    });

    var user = Large.Collections.users.getOrFetch(id);
    var editUser = new Large.Views.UserEdit({
      user: user,
      publications: Large.Collections.publications,
      follows: Large.Collections.follows
    });
    this._swapView(editUser);
  },

  // yourStories: function () {
  //   Large.Collections.publications.fetch({
  //     data: { current_user: true }
  //   });
  //   Large.Collections.users.fetch({
  //     data: { current_user: true }
  //   });
  //   var yourStoriesView = new Large.Views.YourStories({
  //     user: Large.Collections.users,
  //     publications: Large.Collections.publications
  //   })
  //   this._swapView(yourStoriesView);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
