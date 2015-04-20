Large.Views.TagShow = Backbone.CompositeView.extend({
  template: JST['tags/tag_show'],

  initialize: function (options) {
    this.ttag = options.ttag;
    this.taggedStories = options.ttag.taggedStories();
    this.taggedPubs = options.ttag.taggedPubs();
    this.publications = options.pubs;
    this.listenTo(this.ttag, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
    this.listenTo(this.taggedStories, 'sync', this.render);
    this.listenTo(this.taggedPubs, 'sync', this.render);

    this.taggedStories.each(this.addStoryView.bind(this));
    this.listenTo(this.taggedStories, 'add', this.addStoryView);
    this.listenTo(this.taggedStories, 'remove', this.removeStoryView);
  },

  relatedTags: function () {
    debugger
    var tags = [];
    var ids = [];
    this.taggedStories.forEach( function (story) {
      story.ttags().forEach( function (tag) {
        if (ids.indexOf(tag.id) === -1) {
          tags.push(tag);
          ids.push(tag.id);
        }
      })
    });
    // return tags;
    this.taggedPubs.forEach( function (pub) {
      pub.ttags().forEach( function (tag) {
        if (ids.indexOf(tag.id) === -1) {
          tags.push(tag);
          ids.push(tag.id);
        }
      })
    });
    return tags;
  },

  render: function () {
    // debugger
    var tags = this.relatedTags();
    var content = this.template({
      tag: this.ttag,
      tags: tags
    });

    this.$el.html(content);

    this.attachSubviews();
    return this;
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
  }
})
