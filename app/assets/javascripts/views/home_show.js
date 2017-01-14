Large.Views.HomeShow = Backbone.CompositeView.extend({
  template: JST['feeds/feed_show'],
  currentUsername: JST['feeds/_current_username'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory",
    "mouseenter .sidebar": "handleEnter",
    "mouseleave .sidebar": "handleLeave"
  },

  initialize: function (options) {
    this.stories = options.stories;
    this.publications = options.publications;
    this.ttags = options.ttags;
    this.hovering = false;
    // this.currentUser = options.currentUser;
    this.listenTo(this.ttags, 'sync', this.render);
    this.listenTo(this.stories, 'sync', this.render);
    $(window).scroll(this.scrollSidebar.bind(this));

    this.stories.each(this.addStoryView.bind(this));
    this.listenTo(this.stories, 'add', this.addStoryView);
    this.listenTo(this.stories, 'remove', this.removeStoryView);
  },

  addStoryView: function (story) {
    var storyPreview = new Large.Views.StoryPreview({
      model: story,
      publications: this.publications,
      stories: this.stories
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
    Large.Collections.users.fetch();
    topStories.forEach(function (story) {
      author = Large.Collections.users.get(story.get('author_id'))
      if (author !== undefined) {
        authors.push(author.get('email'));
      }
    })
    var content = this.template({
      tags: this.ttags,
      topStories: this.stories.first(5),
      authors: authors
    })
    this.$el.html(content);
    this.attachSubviews();

    var currentUser = Large.Collections.users.get(1)
    if (currentUser !== undefined) {
      $('.feed-username').append(this.currentUsername({ currentUser: currentUser }));
    }

    var newStory = new Large.Models.Story();
    Large.Collections.publications.fetch();
    var newStoryView = new Large.Views.NewStoryPreview({
      parent: this,
      collection: this.stories,
      model: newStory,
      publications: Large.Collections.publications,
      ttags: this.ttags
    });
    this.$('.post-click').append(newStoryView.render().$el);
    var editor = new MediumEditor('.editable', {
      placeholder: "",
      buttons: ['bold', 'italic', 'quote', 'anchor']
    });
    this.$("abbr.timeago").timeago();
    return this;
  },

  scrollSidebar: function (e) {
    var windowTop = $(window).scrollTop();
    var sidebarTop = $('.sidebar').scrollTop();

    if (!this.hovering) {
      $('.sidebar').css("padding-top", 100);
      $('.sidebar').prop("scrollTop", windowTop);
    } else if (windowTop > 71 && sidebarTop < 70) {
      $('.sidebar').css("padding-top", 32);
    } else {
      $('.sidebar').css("padding-top", 100);
    }
  },

  handleEnter: function (e) {
    this.hovering = true;
  },

  handleLeave: function (e) {
    this.hovering = false;
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
