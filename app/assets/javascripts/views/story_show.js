Large.Views.StoryShow = Backbone.View.extend({
  template: JST['stories/story_show'],
  editAndDelete: JST['stories/_edit_and_delete_buttons'],
  currentUsername: JST['feeds/_current_username'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory"
  },

  initialize: function (options) {
    this.story = options.story;
    this.stories = options.stories;
    this.ttags = options.ttags;
    // this.currentUser = options.currentUser;
    this.tagShow = this.story.ttags();
    this.listenTo(this.ttags, 'sync', this.render);
    this.listenTo(this.story, 'sync', this.render);
    this.listenTo(this.tagShow, 'sync', this.render);
    // this.listenTo(this.currentUser, 'sync', this.render);
  },

  render: function () {
    // $('.navbar-nav').find('.options').remove();
    var responseId = this.story.get('story_id')
    var response = this.stories.get(responseId);

    var content = this.template({
      story: this.story,
      response: response,
      tags: this.tagShow,
      currentUser: currentUser
    });
    this.$el.html(content);

    Large.Collections.users.fetch();
    var currentUser = Large.Collections.users.get(1);
    if (currentUser !== undefined) {
      $('.story-username').append(this.currentUsername({ currentUser: currentUser }));
    }

    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    var newStory = new Large.Models.Story({ story_id: this.story.id });
    var newStoryView = new Large.Views.NewStoryPreview({
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
