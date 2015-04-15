Large.Views.StoryShow = Backbone.View.extend({
  template: JST['stories/story_show'],

  events: {
    "click .pre-click": "showNewStory",
    "click #close-new": "hideNewStory",
    "scroll": "handleScroll"
  },

  initialize: function (options) {
    this.story = options.story;
    this.stories = options.stories;
    this.listenTo(this.story, 'sync', this.render);
  },

  render: function () {
    var responseId = this.story.get('story_id')
    var response = this.stories.get(responseId);
    var content = this.template({ story: this.story, response: response });
    this.$el.html(content);

    Large.Collections.publications.fetch({
      data: { current_user: true }
    });
    var newStory = new Large.Models.Story({ story_id: this.story.id });
    var newStoryView = new Large.Views.NewStoryPreview({ collection: this.stories, model: newStory, publications: Large.Collections.publications });

    this.$('.post-click').prepend(newStoryView.render().$el);
    var editor = new MediumEditor('.editable', {
      placeholder: "",
      buttons: ['bold', 'italic', 'quote', 'anchor']
    });
    return this;
  },

  // addPointerEvents: function (){
  //   var scrollFlag = false;
  //   this.$el.removeClass("disable-pointer-events");
  // },
  //
  // debouncePointerEvents: function (){
  //   TweenMax.killDelayedCallsTo(this.addPointerEvents);
  //   TweenMax.delayedCall(scrollThreshold, this.addPointerEvents);
  // },

  // handleScroll: function () {
  //   $bgBlur = $(".bg-blur");
  //
  //   var bgBlurHeight = $bgBlur.height();
  //   var scrollFlag = false;
  //   var scrollThreshold  = 0.25; //used to debounce pointer events
  //   var blurWhenReach = 3;
  //
  //   var scrollTop = $(window).scrollTop();
  //
	//   if(!scrollFlag){
	// 	  scrollFlag = true;
	//     this.$el.addClass("disable-pointer-events");
	//   }
  //
	//   // this.debouncePointerEvents();
  //
	//   if(scrollTop < bgBlurHeight){
	//     var _alpha = (scrollTop / bgBlurHeight) * blurWhenReach;
	//     if(_alpha > 1){ _alpha = 1 }
	// 	  TweenMax.set($bgBlur, {alpha: _alpha });
	//   }
  // },

  showNewStory: function () {
    this.$('.post-click').css('display', 'block');
    this.$('.pre-click').css('display', 'none');
  },

  hideNewStory: function () {
    this.$('.post-click').css('display', 'none');
    this.$('.pre-click').css('display', 'block');
  }

});
