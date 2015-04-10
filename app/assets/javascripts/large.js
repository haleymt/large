window.Large = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("backbone running");
    Large.Collections.users = new Large.Collections.Users();
    Large.Collections.publications = new Large.Collections.Publications();
    // Large.Collections.publications.fetch();
    Large.Collections.follows = new Large.Collections.Follows();
    new Large.Routers.UsersRouter({content: $('#content')});
    new Large.Routers.StoriesRouter({content: $('#content')});
    new Large.Routers.PubsRouter({content: $('#content')});
  
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Large.initialize();
});
