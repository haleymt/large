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
    this.users = options.users;
    this.ttags = options.ttags;
    this.listenTo(this.ttags, 'sync', this.render);
    this.listenTo(this.users, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ publication: this.model, users: this.users }));
    setTimeout(function () {
      var users = this.users
      this.$('#editors').selectivity({
        items: function () {
          var names = [];
          users.forEach ( function (user) {
            names.push(user.get('email'))
          })
          return names;
        }(),
        allowClear: true,
        multiple: true,
        placeholder: "ADD EDITOR"
      });

      this.$('#writers').selectivity({
        items: function () {
          var names = [];
          users.forEach ( function (user) {
            names.push(user.get('email'))
          })
          return names;
        }(),
        allowClear: true,
        multiple: true,
        placeholder: 'ADD WRITER'
      });

      this.$('#pub-tags').selectivity({
        inputType: 'Email',
        placeholder: 'Tag your publication'
      });
    }.bind(this), 100);
    return this;
  },

  alignLeft: function (event) {
    event.preventDefault();
    $('.pub-header-setter').css('text-align', 'left');
    $('.head-text').css('text-align', 'left');
  },

  alignCenter: function (event) {
    event.preventDefault();
    $('.pub-header-setter').css('text-align', 'center');
    $('.head-text').css('text-align', 'center');
  },

  addHeaderImage: function (event) {
    event.preventDefault();
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
    $('.placeholder').css('color', 'rgba(128, 128, 128, 0.7)');
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
    // debugger
    var align = $('.head-text').css('text-align');
    this.model.set("header_align", align);
    // this.model.save(this.model.attributes);

    var formData = this.$('form').serializeJSON();
    this.model.save(formData.publication, {
      success: function () {
        this.collection.add(this.model, { merge: true });

        var editors = $('#editors').find('.selectivity-multiple-selected-item');
        if (editors.first().text() !== "") {
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
        if (writers.first().text() !== "") {
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

        var tags = $('#pub-tags').find('.selectivity-multiple-selected-item');
        if (tags.first().text() !== "") {
          ttags = this.ttags;
          pub = this.model
          var ids = [];
          tags.each(function () {
            tag = ttags.findWhere({ label: $(this).text() })
            if (tag === undefined) {
              tag = new Large.Models.Tag({ label: $(this).text()});
              tag.save(tag.attributes, {
                success: function () {
                  var tagging = new Large.Models.Tagging({
                    taggable_id: pub.id,
                    taggable_type: "Publication",
                    tag_id: tag.id
                  });
                  tagging.save();
                }
              })
            } else {
              ids.push(tag.id);
            }
          })
          ids.forEach( function (i) {
            var tagging = new Large.Models.Tagging({
              taggable_id: pub.id,
              taggable_type: "Publication",
              tag_id: i
            });
            tagging.save(tagging.attributes);
          })
        }

        Backbone.history.navigate("publications/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
