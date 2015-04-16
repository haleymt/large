Large.Views.HomeShow = Backbone.CompositeView.extend({
  template: JST['feeds/feed_show'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory"
  },

  initialize: function (options) {
    this.stories = options.stories;
    this.publications = options.publications;
    this.listenTo(this.stories, 'sync', this.render);

    this.stories.each(this.addStoryView.bind(this));
    this.listenTo(this.stories, 'add', this.addStoryView);
    this.listenTo(this.stories, 'remove', this.removeStoryView);
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
    this.$el.html(this.template());
    this.attachSubviews();
    this.$("abbr.timeago").timeago();

    var newStory = new Large.Models.Story();
    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    var newStoryView = new Large.Views.NewStoryPreview({
      collection: this.stories,
      model: newStory,
      publications: Large.Collections.publications
    });
    this.$('.post-click').prepend(newStoryView.render().$el);
    var editor = new MediumEditor('.editable', {
      placeholder: "",
      buttons: ['bold', 'italic', 'quote', 'anchor']
    });
    return this;
  },

  showNewStory: function () {
    this.$('.post-click').css('display', 'block');
    this.$('.pre-click').css('display', 'none');
    // var e = jQuery.Event("keydown");
    // e.which = 13; // # Some key code value
    // $(".editable").trigger(e);
  },

  hideNewStory: function () {
    this.$('.post-click').css('display', 'none');
    this.$('.pre-click').css('display', 'block');
  }
});
