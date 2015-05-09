Large.Views.PubAbout = Backbone.View.extend({
  template: JST['publications/pub_about'],

  events: {
    "click .follow": "toggleFollow"
  },

  initialize: function (options) {
    this.pub = options.pub;
    this.editors = this.pub.editors();
    this.writers = this.pub.writers();
    this.currentUserFollows = options.follows;
    this.listenTo(this.pub, 'sync', this.render);
    this.listenTo(this.currentUserFollows, 'sync', this.render);
  },

  render: function () {
    $('.navbar-header').find('.about-link').remove();
    $('.navbar-nav').find('.user-edit-toggle').remove();
    var content = this.template({
      pub: this.pub,
      writers: this.writers,
      editors: this.editors
    });
    this.$el.html(content);

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
})
