window.Large = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // this.NAV_VIEW = new Large.Views.NavShow({
    //   el: $('nav')
    // });

    console.log("backbone running");
    Large.Collections.users = new Large.Collections.Users();
    Large.Collections.users.fetch();
    Large.Collections.publications = new Large.Collections.Publications();
    Large.Collections.follows = new Large.Collections.Follows();

    new Large.Routers.UsersRouter({content: $('#content')});
    new Large.Routers.StoriesRouter({content: $('#content')});
    new Large.Routers.PubsRouter({content: $('#content')});

    Backbone.history.start();
  }
};
