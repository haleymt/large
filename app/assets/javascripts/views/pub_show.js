Large.Views.PubShow = Backbone.View.extend({
  template: JST['publications/pub_show'],

  events: {
    "click .follow": "toggleFollow"
  },

  initialize: function (options) {
    this.pub = options.pub;
    this.stories = this.pub.stories();
    this.publications = options.publications
    this.currentUserFollows = options.follows;

    this.numFollows = this.pub.follows();
    this.listenTo(this.pub, 'sync', this.render);
    this.listenTo(this.stories, 'add', this.render);
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ pub: this.pub, followers: this.numFollows.length });
    this.$el.html(content);

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story, publications: this.publications });
      this.$('ul.pub-stories').prepend(storyPreview.render().$el);
    }.bind(this));

    return this;
  },

  toggleFollow: function () {
    var follow = this.currentUserFollows.findWhere({
                      followable_id: this.pub.id,
                      followable_type: "Publication" });

    if (follow === undefined) {
      follow = new Large.Models.Follow( { followable_id: this.pub.id, followable_type: "Publication" });
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
