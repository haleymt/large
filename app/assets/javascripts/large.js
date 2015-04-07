window.Large = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("backbone running");
    new Large.Routers.StoriesRouter({content: $('#content')});
    Large.Collections.users = new Large.Collections.Users();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Large.initialize();
});
