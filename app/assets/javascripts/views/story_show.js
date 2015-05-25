Large.Views.StoryShow = Backbone.View.extend({
  template: JST['stories/story_show'],
  editAndDelete: JST['stories/_edit_and_delete_buttons'],
  currentUsername: JST['feeds/_current_username'],
  authorUsername: JST['stories/_author_username'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory"
  },

  initialize: function (options) {
    this.story = options.story;
    this.stories = options.stories;
    this.ttags = options.ttags;
    this.tagShow = this.story.ttags();
    this.users = options.users;

    this.listenTo(this.users, 'sync', this.render);
    this.listenTo(this.ttags, 'sync', this.render);
    this.listenTo(this.story, 'sync', this.render);
    this.listenTo(this.tagShow, 'sync', this.render);
  },

  render: function () {
    // debugger
    $('.navbar-nav').find('.new-story-header').remove();
    $('.navbar-nav').find('.user-edit-toggle').remove();
    $('.navbar-header').find('.about-link').remove();

    var responseId = this.story.get('story_id');
    var response = this.stories.get(responseId);

    var content = this.template({
      story: this.story,
      response: response,
      tags: this.tagShow
    });

    this.$el.html(content);

    $('p').first().text(this.story.get('title'));
    $($('p')[1]).text(this.story.get('subtitle'));

    var authorId = this.story.get('author_id');
    var author = this.users.get(authorId);

    if (this.story.get('created_at') !== undefined) {
      var date = this.getDate(this.story.get('created_at'));
    }
    if (this.story.get('body') !== undefined) {
      var readingTime = this.readingTime(this.story.get('body'));
    }

    if (author !== undefined) {
      $('.story-footer').append(this.authorUsername({ author: author, date: date, readingTime: readingTime }));
    }

    var currentUser = this.users.get(1);
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

  getDate: function (sqlDate) {
    var sqlDateArr1 = sqlDate.split("-");
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var sqlDateArr2 = sqlDateArr1[2].split("T");
    var sDay = sqlDateArr2[0];
    var sqlDateArr3 = sqlDateArr2[1].split(":");
    var sHour = sqlDateArr3[0];
    var sMinute = sqlDateArr3[1];
    var sqlDateArr4 = sqlDateArr3[2].split(".");
    var sSecond = sqlDateArr4[0];
    var sMillisecond = sqlDateArr4[1].slice(0,sqlDateArr4.length-1);

    var months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December']
    date = new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,sMillisecond);
    now = new Date();

    var month = date.getMonth();
    var day = date.getDay() + 1;
    var year = date.getYear();

    if (now.getYear() > year) {
      return months[month] + " " + day + ", " + year;
    } else {
      return months[month] + " " + day;
    }
  },

  readingTime: function (text) {
    if ((text === null) || (text.split('</p>').length < 3)) {
      var firstSentence = "";
      var readingTime = "Less than a";
    } else {
      var firstSentence = text.split('</p>')[2].split(">")[text.split('</p>')[2].split(">").length - 1]
      readingTime = Math.floor(text.length / 2800);
      if (readingTime === 0) {
        readingTime = "Less than a";
      }
    }
    return readingTime;
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
