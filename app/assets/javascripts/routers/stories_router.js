Large.Routers.StoriesRouter = Backbone.Router.extend({
  routes: {
    "": "homeShow",
    "stories/new": "newStory",
    "stories/:id": "storyShow",
    "stories/:id/edit": "storyEdit",
    "search": "searchShow"
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
    this.collection.fetch({
      data: { current_user: true }
    })
    var home = new Large.Views.HomeShow({stories: this.collection,
      publications: Large.Collections.publications })
    this._swapView(home);
  },

  newStory: function () {
    var story = new Large.Models.Story();
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    this.collection.fetch({
      data: { current_user: false}
    });

    var storyNew = new Large.Views.NewStory({ collection: this.collection, model: story, publications: Large.Collections.publications });
    this._swapView(storyNew);
  },

  storyShow: function (id) {
    var story = this.collection.getOrFetch(id);
    showStory = new Large.Views.StoryShow({ story: story, stories: this.collection });
    this._swapView(showStory);
  },

  storyEdit: function(id) {
    var story = this.collection.getOrFetch(id);
    var editStory = new Large.Views.StoryEdit({ model: story });
    this._swapView(editStory);
  },

  searchShow: function (params) {
    if (params.replace(/\s/g,"") == "") {
      var search = new Large.Views.SearchShow();
    } else {
      Large.Collections.publications.fetch({
        data: { query: params }
      });
      Large.Collections.users.fetch({
        data: { query: params }
      });
      this.collection.fetch({
        data: { query: params }
      });
      var search = new Large.Views.SearchShow({
        params: params,
        publications: Large.Collections.publications,
        users: Large.Collections.users,
        stories: this.collection
      });
    }
    this._swapView(search);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
