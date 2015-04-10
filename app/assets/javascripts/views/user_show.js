Large.Views.UserShow = Backbone.View.extend({
  template: JST['users/user_show'],

  events: {
    "click .follow": "toggleFollow"
  },

  initialize: function (options) {

    this.user = options.user;
    this.stories = this.user.stories();
    this.publications = options.publications;
    this.follows = this.user.follows();
    this.followings = this.user.followings();
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.stories, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
    // this.listenTo(this.follows, 'sync', this.render);

  },

  render: function () {
    // debugger
    var content = this.template({ user: this.user, followers: this.follows.length, followings: this.followings.length });
    this.$el.html(content);

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story, publications: this.publications });
      this.$('ul.user-stories').prepend(storyPreview.render().$el);
    }.bind(this));
    return this;
  },

  toggleFollow: function () {
    // Large.Collections.follows.fetch({
    //   followable_id: this.id,
    //   followable_type: "User",
    //   data: { current_user: true }
    // });




    // if (payload.follow) {
    //   if (payload.follow.isNew()) {
    //     var follow = new Backbone.Model.Follow( { followable_id: this.id, followable_type: "User" });
    //     pub.follows.add(follow)
    //   } else {
    //     payload.follow.destroy!
    //   }
    // }

  }
});
