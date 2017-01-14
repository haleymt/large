Large.Routers.TagsRouter = Backbone.Router.extend({
  routes: {
    "tags/:id": "tagShow"
  },

  initialize: function (options) {
    this.collection = new Large.Collections.Tags();
    this.$rootEl = options.content;
  },

  tagShow: function (id) {
    var tag = this.collection.getOrFetch(id);
    Large.Collections.users.fetch();
    Large.Collections.publications.fetch();
    Large.Collections.ttags.fetch({
      data: { tag_id: id }
    })
    showTag = new Large.Views.TagShow({
      ttag: tag,
      pubs: Large.Collections.publications,
      ttags: Large.Collections.ttags,
      users: Large.Collections.users,
    });
    this._swapView(showTag);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
