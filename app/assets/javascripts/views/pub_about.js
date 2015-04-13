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
    var content = this.template({
      pub: this.pub,
      writers: this.writers,
      editors: this.editors
    });

    this.$el.html(content);
    return this;
  },

  toggleFollow: function (event) {
    var $id = $(event.currentTarget).attr('id');
    var $type = $(event.currentTarget).val();
    var follow = this.currentUserFollows.findWhere({
                      followable_id: $id,
                      followable_type: $type });

    if (follow === undefined) {
      follow = new Large.Models.Follow( { followable_id: $id, followable_type: $type });
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
})
