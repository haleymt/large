Large.Views.SearchShow = Backbone.View.extend({
  template: JST['search/search_show'],

  events: {
    "submit": "handleInput",
    "click .follow": "toggleFollow"
  },

  initialize: function (options) {
    this.params = options.params;
    this.publications = options.publications;
    this.users = options.users;
    this.stories = options.stories;
    this.currentUserFollows = options.follows

    if (this.params !== null) {
      this.listenTo(this.publications, 'sync', this.render);
      this.listenTo(this.users, 'sync', this.render);
      this.listenTo(this.stories, 'sync', this.render);
    }
    this.listenTo(this.currentUserFollows, 'sync', this.render)
  },

  render: function () {
    // debugger
    this.$el.html(this.template({ params: this.params, publications: this.publications, stories: this.stories, users: this.users }));
    this.$('input[type=submit]').hide();
    return this;
  },

  handleInput: function () {
    var params = this.$('#box').val();
    Backbone.history.navigate("/search?q=" + params, { trigger: true });
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

});
