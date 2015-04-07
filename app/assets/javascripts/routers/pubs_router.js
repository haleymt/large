Large.Routers.PubsRouter = Backbone.Router.extend({
  routes: {
    "publications/new": "newPub",
    "publications/:id": "showPub",
    "publications/:id/edit": "editPub"
  },

  initialize: function (options) {
    this.collection = new Large.Collections.Publications();
    this.collection.fetch();
    this.$rootEl = options.content
  },

  newPub: function () {

  },

  showPub: function (id) {

  },

  editPub: function (id) {

  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
