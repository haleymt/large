window.Large = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("backbone running");
    new Large.Routers.StoriesRouter({content: $('#content')});
    new Large.Routers.PubsRouter({content: $('#content')})
    Large.Collections.users = new Large.Collections.Users();
    Large.Collections.users.fetch();
    Large.Collections.publications = new Large.Collections.Publications();
    Large.Collections.publications.fetch();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Large.initialize();
});
