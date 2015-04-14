Large.Views.SearchShow = Backbone.View.extend({
  template: JST['search/search_show'],

  events: {
    "submit": "handleInput",
    "click .follow": "toggleFollow"
  },

  initialize: function (options) {
    this.currentUserFollows = options.follows
    this.params = options.params;
    this.publications = options.publications;
    this.users = options.users;
    this.stories = options.stories;

    if (this.params !== null) {
      this.listenTo(this.currentUserFollows, 'sync', this.render);
      this.listenTo(this.publications, 'sync', this.render);
      this.listenTo(this.users, 'sync', this.render);
      this.listenTo(this.stories, 'sync', this.render);
    }
  },

  render: function () {
    var content = this.template({
      params: this.params,
      publications: this.publications,
      stories: this.stories,
      users: this.users
    });
    this.$el.html(content);
    this.$('input[type=submit]').hide();
    $('.follow').each(function (i, obj) {
      var $id = parseInt($(obj).attr('id'));
      var $type = $(obj).val();
      var follow = this.currentUserFollows.findWhere({
                        followable_id: $id,
                        followable_type: $type });
      if (!!follow) {
        $(obj).data('follow-state', 'followed');
      } else {
        $(obj).data('follow-state', 'unfollowed');
      }
    }.bind(this));

    $('.follow').each(function (i, obj) {
      if ($(obj).data('follow-state') == "followed") {
        $(obj).html("Unfollow!");
      } else {
        $(obj).html("Follow!");
      }
    });
    return this;
  },

  handleInput: function () {
    var params = this.$('#box').val();
    Backbone.history.navigate("/search?q=" + params, { trigger: true });
  },

  toggleFollow: function (event) {
    var $id = parseInt($(event.currentTarget).attr('id'));
    var $type = $(event.currentTarget).val();
    var follow = this.currentUserFollows.findWhere({
                      followable_id: $id,
                      followable_type: $type });

    if (follow === undefined) {
      follow = new Large.Models.Follow( { followable_id: $id, followable_type: $type });
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
