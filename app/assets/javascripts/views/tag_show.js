Large.Views.TagShow = Backbone.CompositeView.extend({
  template: JST['tags/tag_show'],

  initialize: function (options) {
    this.ttag = options.ttag;
    this.ttags = options.ttags;
    this.taggedStories = options.ttag.taggedStories();
    this.publications = options.pubs;
    this.allUsers = options.users;

    this.listenTo(this.publications, 'sync', this.render);
    this.listenTo(this.taggedStories, 'sync', this.render);
    this.listenTo(this.ttags, 'sync', this.render);

    this.taggedStories.each(this.addStoryView.bind(this));
    this.listenTo(this.taggedStories, 'add', this.addStoryView);
    this.listenTo(this.taggedStories, 'remove', this.removeStoryView);
  },

  render: function () {
    var content = this.template({
      tag: this.ttag,
      tags: this.ttags
    });

    this.$el.html(content);

    this.attachSubviews();
    return this;
  },

  addStoryView: function (story) {
    var storyPreview = new Large.Views.StoryPreview({
      model: story,
      publications: this.publications,
      stories: this.taggedStories,
      allUsers: this.allUsers
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
