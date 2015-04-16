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
    $('#editors').selectivity({
      multiple: true
    });
    $('#writers').selectivity({
      multiple: true
    });
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
        //iterate through writers and editors and create new pubedits/writes
        var editors = $('#editors').find('.selectivity-multiple-selected-item');
        
        if (editors.first().text() !== "" ) {
          users = this.users;
          pub = this.model
          var ids = [];
          editors.each(function () {
            user = users.findWhere({ email: $(this).text() })
            ids.push(user.id);
          })
          ids.forEach( function (i) {
            var pubEdit = new Large.Models.PubEdit({ pub_id: pub.id, editor_id: i });
            pubEdit.save(pubEdit.attributes);
          })
        }

        var writers = $('#writers').find('.selectivity-multiple-selected-item');
        if (writers.first().text() !== "" ) {
          users = this.users;
          pub = this.model
          var ids = [];
          writers.each(function () {
            user = users.findWhere({ email: $(this).text() })
            ids.push(user.id);
          })
          ids.forEach( function (i) {
            var pubWrite = new Large.Models.PubWrite({ pub_id: pub.id, writer_id: i });
            pubWrite.save(pubWrite.attributes);
          })
        }

        Backbone.history.navigate("publications/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
