Large.Views.UserShow = Backbone.View.extend({
  template: JST['users/user_show'],

  events: {
    "click .follow": "toggleFollow"
  },

  initialize: function (options) {
    this.user = options.user;
    this.stories = this.user.stories();
    this.publications = options.publications;
    this.currentUserFollows = options.follows;
    this.follows = this.user.follows();
    this.followings = this.user.followings();

    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.stories, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
    this.listenTo(this.follows, 'sync remove add', this.render);
  },

  render: function () {
    var content = this.template({ user: this.user, followers: this.follows.length, followings: this.followings.length });
    this.$el.html(content);

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story, publications: this.publications });
      this.$('ul.user-stories').prepend(storyPreview.render().$el);
    }.bind(this));
    return this;
  },

  toggleFollow: function () {
    var follow = this.currentUserFollows.findWhere({
      followable_id: this.user.id,
      followable_type: "User",
    });

    if (follow === undefined) {
      follow = new Large.Models.Follow( { followable_id: this.user.id, followable_type: "User" });
      follow.save(follow.attributes, {
        success: function () {
          console.log("success")
        }
      });
    } else {
      follow.destroy({
        success: function (model, response) {
          console.log("successful destroy")
        }
      });
    }
  }
});
