Large.Views.UserEdit = Backbone.View.extend({
  template: JST['users/user_edit'],

  events: {
    "click .follow": "toggleFollow",
    "click .user-header-image": "addHeaderImage",
    "click .save-edits": "saveEdits"
  },

  initialize: function (options) {
    this.user = options.user;
    this.publications = options.publications;
    this.currentUserFollows = options.follows;

    this.follows = this.user.followers();
    this.followings = this.user.followedUsers();

    this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    $('.navbar-nav').find('.user-edit-toggle').remove();
    var content = this.template({ user: this.user, followers: this.follows, followings: this.followings });
    this.$el.html(content);
    $('.edit-email').focus();
    return this;
  },

  addHeaderImage: function (event) {
    event.preventDefault();

    filepicker.setKey("AFA8IlPkxSNC1BPrgoHtsz");
    filepicker.pick(
      {
        mimetypes:'image/*',
        services:'COMPUTER'
      },
      function (Blob) {
        var image = Blob.url;
        this.user.set("header_image", image);
        this.$('.user-header-image').css('background-image', "url('" + image + "')");
      }.bind(this)
    )
  },

  saveEdits: function (event) {
    event.preventDefault();
    if ($('.edit-email').val() === "") {
      $('#blankStoryError').modal('show');
      setTimeout( function () {
        $('#blankStoryError').modal('hide');
      }, 2500)
    } else {
      var formData = this.$('form').serializeJSON();

      this.user.save(formData.user, {
        success: function () {
          Backbone.history.navigate("users/" + this.user.id, { trigger: true });
        }.bind(this)
      });
    }
  }

});
