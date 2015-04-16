Large.Views.NewPub = Backbone.View.extend({
  template: JST['publications/new_pub'],

  events: {
    "click #submit-new-pub": "submitForm",
    "click #align-left": "alignLeft",
    "click #align-center": "alignCenter",
    "click #pub-header-image": "addHeaderImage",
    "click #pub-icon": "addIcon"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.users = options.users
    this.listenTo(this.users, 'sync', this.render)
  },

  render: function () {
    // debugger
    this.$el.html(this.template({ publication: this.model, users: this.users }));

    // $('#editors').selectivity({multiple: true});
    // $('#writers').selectivity({multiple: true});
    return this;
  },

  alignLeft: function () {
    $('.pub-header-setter').css('text-align', 'left');
    $('input').css('text-align', 'left');
  },

  alignCenter: function () {
    $('.pub-header-setter').css('text-align', 'center');
    $('input').css('text-align', 'center');
  },

  addHeaderImage: function () {
    $('[placeholder]').focus(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    filepicker.setKey("AFA8IlPkxSNC1BPrgoHtsz");

    filepicker.pick(
      {
        mimetypes:'image/*',
        services:'COMPUTER'
      },
      function (Blob) {
        var image = Blob.url;
        console.log(image);
        this.model.set("header_image", image);
        $('.placeholder').css('color', 'rgba(255, 255, 255, 0.8)');
        $('.fa-camera').css('color', 'rgba(255, 255, 255, 0.8)');
        this.$('.pub-header-setter').css('background-image', "url('" + image + "')");
      }.bind(this)
    )
  },

  addIcon: function () {
    alert("can't add icons yet!");
  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$('form').serializeJSON();
    this.model.save(formData.publication, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        if ( $('#editors').val() > 0 ) {
          var editorId = $('#editors').val();
          var pubEdit = new Large.Models.PubEdit({ pub_id: this.model.id, editor_id: editorId });
          pubEdit.save(pubEdit.attributes);
        }
        if ( $('#writers').val() > 0 ) {
          var writerId = $('#writers').val();
          var pubWrite = new Large.Models.PubWrite({ pub_id: this.model.id, writer_id: writerId });
          pubWrite.save(pubWrite.attributes);
        }
        Backbone.history.navigate("publications/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
