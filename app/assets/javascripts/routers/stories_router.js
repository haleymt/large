Large.Routers.StoriesRouter = Backbone.Router.extend({
  routes: {
    "": "homeShow",
    "stories/new": "newStory",
    "stories/:id": "storyShow",
    "stories/:id/edit": "storyEdit",
    "search": "searchShow"
  },

  initialize: function (options) {
    this.collection = Large.Collections.stories;
    this.$rootEl = options.content;
  },

  homeShow: function () {
    Large.Collections.publications.fetch({
      data: { current_user: false }
    });
    this.collection.fetch({
      data: { current_user: true }
    });
    Large.Collections.ttags.fetch();
    // Large.Collections.users.fetch({
    //   data: { current_user: true }
    // })
    var home = new Large.Views.HomeShow({
      stories: this.collection,
      // currentUser: Large.Collections.users,
      publications: Large.Collections.publications,
      ttags: Large.Collections.ttags
    });
    this._swapView(home);
  },

  newStory: function () {
    var story = new Large.Models.Story();
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    this.collection.fetch({
      data: { current_user: false }
    });
    Large.Collections.ttags.fetch();
    var storyNew = new Large.Views.NewStory({
      collection: this.collection,
      model: story,
      publications: Large.Collections.publications,
      ttags: Large.Collections.ttags
    });
    this._swapView(storyNew);
  },

  newStoryPreview: function () {
    var story = new Large.Models.Story();
    this.collection.fetch({
      data: { current_user: false }
    });
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    Large.Collections.ttags.fetch();
    var newPreview = new Large.Views.NewStoryPreview({
      publications: Large.Collections.publications,
      collection: this.collection,
      model: story,
      ttags: Large.Collections.ttags
    });
    this._swapView(newPreview);
  },

  storyShow: function (id) {
    this.collection.fetch();
    var story = this.collection.getOrFetch(id);
    Large.Collections.ttags.fetch();
    Large.Collections.users.fetch({
      data: { current_user: true }
    })
    showStory = new Large.Views.StoryShow({
      story: story,
      stories: this.collection,
      ttags: Large.Collections.ttags,
      currentUser: Large.Collections.users
    });
    this._swapView(showStory);
  },

  storyEdit: function(id) {
    var story = this.collection.getOrFetch(id);
    var editStory = new Large.Views.StoryEdit({ model: story });
    this._swapView(editStory);
  },

  searchShow: function (params) {
    Large.Collections.follows.fetch({
      data: { current_user: true }
    }).done( function () {
      if (params === null || params.replace(/\s/g,"") == "") {
        var search = new Large.Views.SearchShow({
          params: null,
          follows: Large.Collections.follows
        });
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
          stories: this.collection,
          follows: Large.Collections.follows
        });
      }
      this._swapView(search);
    }.bind(this));
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
