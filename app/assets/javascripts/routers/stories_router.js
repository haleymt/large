Large.Routers.StoriesRouter = Backbone.Router.extend({
  routes: {
    "": "homeShow",
    "stories/new": "newStory",
    "stories/:id": "storyShow",
    "users/:id": "userShow",
    "stories/:id/edit": "storyEdit"
  },

  initialize: function (options) {
    this.collection = new Large.Collections.Stories();
    this.collection.fetch();
    this.$rootEl = options.content;
  },

  homeShow: function () {
    Large.Collections.publications.fetch({
      data: { current_user: false }
    });
    var home = new Large.Views.HomeShow({stories: this.collection, publications: Large.Collections.publications })
    this._swapView(home);
  },

  newStory: function () {
    var story = new Large.Models.Story();
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    var storyNew = new Large.Views.NewStory({ collection: this.collection, model: story, publications: Large.Collections.publications });
    this._swapView(storyNew);
  },

  storyShow: function (id) {
    var story = this.collection.getOrFetch(id);
    var showStory = new Large.Views.StoryShow({ story: story });
    this._swapView(showStory);
  },

  userShow: function (id) {
    Large.Collections.publications.fetch({
      data: { current_user: false }
    });
    var user = Large.Collections.users.getOrFetch(id);
    var showUser = new Large.Views.UserShow({ user: user, publications: Large.Collections.publications });
    this._swapView(showUser);

    //move to a user's router??
  },

  storyEdit: function(id) {
    var story = this.collection.getOrFetch(id);
    var editStory = new Large.Views.StoryEdit({ model: story });
    this._swapView(editStory);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
