Large.Views.UserShow = Backbone.View.extend({
  template: JST['users/user_show'],
  editToggle: JST['users/user_edit_toggle'],

  events: {
    "click .follow": "toggleFollow",
    "click .preview": "setTransitionState"
  },

  initialize: function (options) {
    this.user = options.user;
    this.currentUser = options.currentUser;
    this.stories = this.user.stories();
    this.publications = options.publications;
    this.currentUserFollows = options.follows;
    this.allStories = options.allStories;

    this.follows = this.user.followers();
    this.followings = this.user.followedUsers();
    this.transitioning = false;

    this.listenTo(this.currentUserFollows, 'sync add remove', this.render);
    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.stories, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
    this.listenTo(this.allStories, 'sync', this.render);
  },

  render: function () {
    if (!this.transitioning) {
      $('.navbar-nav').find('.user-edit-toggle').remove();

      var content = this.template({ user: this.user, followers: this.follows, followings: this.followings });
      this.$el.html(content);

      var currentUser = this.currentUser.last();
      if ((currentUser !== undefined) && (currentUser.id === this.user.id)) {
        $('.navbar-nav').prepend(this.editToggle({ currentUser: currentUser }));
      }

      var follow = this.currentUserFollows.findWhere({
                        followable_id: this.user.id,
                        followable_type: "User" });
      if (!!follow) {
        $('.follow').data('follow-state', 'followed');
      } else {
        $('.follow').data('follow-state', 'unfollowed');
      }

      if ($('.follow').data('follow-state') == "followed") {
        $('.follow').html("Unfollow!");
      } else {
        $('.follow').html("Follow!");
      }

      this.stories.models.forEach( function(story) {
        var storyPreview = new Large.Views.StoryPreview({
          model: story,
          stories: this.allStories,
          publications: this.publications
        });
        this.$('ul.user-stories').prepend(storyPreview.render().$el);
        this.$("abbr.timeago").timeago();
      }.bind(this));
      this.$("abbr.timeago").timeago();

      return this;
    }
  },

  setTransitionState: function (event) {
    this.transitioning = true;
  },

  toggleFollow: function () {
    var follow = this.currentUserFollows.findWhere({
                      followable_id: this.user.id,
                      followable_type: "User" });

    if (follow === undefined) {
      follow = new Large.Models.Follow({ followable_id: this.user.id, followable_type: "User" });
      follow.save(follow.attributes, {
        success: function () {
          $(event.currentTarget).data('follow-state', 'followed');
          $(event.currentTarget).html("Unfollow!");
        }
      });
    } else {
      follow.destroy({
        success: function (model, response) {
          $(event.currentTarget).data('follow-state', 'unfollowed');
          $(event.currentTarget).html("Follow!");
        }
      });
    }
  }
});
