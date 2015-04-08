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
    this.$rootEl = options.content
  },

  homeShow: function () {
    var home = new Large.Views.HomeShow({stories: this.collection})
    this._swapView(home);
  },

  newStory: function () {
    var story = new Large.Models.Story();
    // var author = Large.Collections.users.getOrFetch(user_id);
    // var pubs = author.pubs();
    var storyNew = new Large.Views.NewStory({ collection: this.collection, model: story });
    this._swapView(storyNew);
  },

  storyShow: function (id) {
    var story = this.collection.getOrFetch(id);
    var showStory = new Large.Views.StoryShow({ story: story });
    this._swapView(showStory);
  },

  userShow: function (id) {
    var user = Large.Collections.users.getOrFetch(id);
    var showUser = new Large.Views.UserShow({ user: user });
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
