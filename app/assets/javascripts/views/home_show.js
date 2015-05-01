Large.Views.HomeShow = Backbone.CompositeView.extend({
  template: JST['feeds/feed_show'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory"
  },

  initialize: function (options) {
    this.stories = options.stories;
    this.publications = options.publications;
    this.ttags = options.ttags
    this.listenTo(this.ttags, 'sync', this.render)
    this.listenTo(this.stories, 'sync', this.render);

    this.stories.each(this.addStoryView.bind(this));
    this.listenTo(this.stories, 'add', this.addStoryView);
    this.listenTo(this.stories, 'remove', this.removeStoryView);
  },

  addStoryView: function (story) {
    var storyPreview = new Large.Views.StoryPreview({
      model: story, publications: this.publications
    });
    this.addSubview('.main-stories', storyPreview);
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
    $('.navbar-nav').find('.new-story-header').remove();
    $('.navbar-nav').find('.about-link').remove();
    var topStories = this.stories.first(5);
    authors = [];
    topStories.forEach(function (story) {
      author = Large.Collections.users.get(story.get('author_id'))
      authors.push(author.get('email'));
    })
    var content = this.template({
      tags: this.ttags,
      topStories: this.stories.first(5),
      authors: authors
    })
    this.$el.html(content);
    this.attachSubviews();

    var newStory = new Large.Models.Story();
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    var newStoryView = new Large.Views.NewStoryPreview({
      parent: this,
      collection: this.stories,
      model: newStory,
      publications: Large.Collections.publications,
      ttags: this.ttags
    });
    this.$('.post-click').prepend(newStoryView.render().$el);
    var editor = new MediumEditor('.editable', {
      placeholder: "",
      buttons: ['bold', 'italic', 'quote', 'anchor']
    });
    this.$("abbr.timeago").timeago();
    return this;
  },

  showNewStory: function () {
    this.$('.post-click').css('display', 'block');
    this.$('.pre-click').css('display', 'none');
    $('.editable').focus();
  },

  hideNewStory: function () {
    this.$('.post-click').css('display', 'none');
    this.$('.pre-click').css('display', 'block');
  }
});
