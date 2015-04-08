Large.Views.PubShow = Backbone.View.extend({
  template: JST['publications/pub_show'],

  initialize: function (options) {
    this.pub = options.pub;
    this.stories = this.pub.stories();
    this.publications = options.publications
    this.listenTo(this.pub, 'sync', this.render);
    this.listenTo(this.stories, 'add', this.render);
    // this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ pub: this.pub });
    this.$el.html(content);

    this.stories.models.forEach( function(story) {
      var storyPreview = new Large.Views.StoryPreview({ model: story, publications: this.publications });
      this.$('ul.pub-stories').append(storyPreview.render().$el);
    }.bind(this));

    return this;
  }
});
