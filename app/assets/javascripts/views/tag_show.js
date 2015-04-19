Large.Views.TagShow = Backbone.CompositeView.extend({
  template: JST['tags/tag_show'],

  initialize: function (options) {
    this.ttag = options.ttag;
    this.publications = options.pubs;
    this.taggedStories = this.ttag.taggedStories();
    this.taggedPubs = this.ttag.taggedPubs();
    this.listenTo(this.ttag, 'sync', this.render);
    this.listenTo(this.taggedStories, 'sync', this.render);
    this.listenTo(this.taggedPubs, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);

    this.taggedStories.each(this.addStoryView.bind(this));
    this.listenTo(this.taggedStories, 'add', this.addStoryView);
    this.listenTo(this.taggedStories, 'remove', this.removeStoryView);
  },

  addStoryView: function (story) {
    var storyPreview = new Large.Views.StoryPreview({
      model: story, publications: this.publications
    });
    this.addSubview('ul', storyPreview);
  },

  removeStoryView: function (story) {
    var subviews = this.subviews('ul');
    var i = _(subviews).findIndex(function (el) {
      return el.model === story;
    });
    if (i === -1) { return };

    subviews[i].remove();
    subviews.splice(i, 1);
  },

  render: function () {
    // debugger
    var tags = []
    this.taggedStories.forEach( function (story) {
      story.ttags().forEach( function (tag) {
        tags.push(tag);
      })
    });

    this.taggedPubs.forEach( function (pub) {
      pub.ttags().forEach( function (tag) {
        tags.push(tag);
      })
    });

    var content = this.template({
      tag: this.ttag,
      tags: tags
    });

    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})
