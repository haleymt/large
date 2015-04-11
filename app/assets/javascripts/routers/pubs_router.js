Large.Routers.PubsRouter = Backbone.Router.extend({
  routes: {
    "publications/new": "newPub",
    "publications/:id": "showPub",
    "publications/:id/edit": "editPub",
    "publications/:id/about": "aboutPub"
  },

  initialize: function (options) {
    this.collection = new Large.Collections.Publications();
    Large.Collections.users.fetch();
    this.$rootEl = options.content;
  },

  newPub: function () {
    var publication = new Large.Models.Publication();
    var pubNew = new Large.Views.NewPub({ collection: this.collection, model: publication, users: Large.Collections.users });
    this._swapView(pubNew);
  },

  showPub: function (id) {
    var pub = this.collection.getOrFetch(id);
    Large.Collections.follows.fetch({
      data: { current_user: true }
    });
    var showPub = new Large.Views.PubShow({
      pub: pub,
      publications: this.collection,
      follows: Large.Collections.follows
    });
    this._swapView(showPub);
  },

  editPub: function (id) {
    var pub = this.collection.getOrFetch(id);
    var editPub = new Large.Views.PubEdit({ pub: pub });
    this._swapView(editPub);
  },

  aboutPub: function (id) {
    var pub = this.collection.getOrFetch(id);
    var aboutPub = new Large.Views.PubAbout({ pub: pub });
    this._swapView(aboutPub);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
