Large.Views.NewStory = Backbone.View.extend({
  template: JST['stories/new_story'],
  header: JST['stories/_new_story_header'],
  insertToolbar: JST['stories/_insert_toolbar'],

  events: {
    "click #header-image": "addImage",
    "click #submit-confirm": "submitForm",
    "click #confirm": "autoSave",
    "keyup .editable": "addButton",
    "click .insert-pic": "insertPic",
    "click .insert-line": "insertLine",
    "click .editable": "showToolbar",
    "click .new-insert": "showHiddenButtons",
    "keyup .editable": "toolbarTooltip"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.publications = options.publications;
    this.ttags = options.ttags;

    this.listenTo(this.ttags, 'sync', this.render);
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    $('.navbar-nav').find('.new-story-header').remove();
    var headerContent = this.header({
      story: this.model,
      publications: this.publications
    });
    $('.navbar-nav').prepend(headerContent);
    this.$el.html(this.template({ story: this.model, publications: this.publications }));

    var editor = new MediumEditor('.editable', {
      placeholder: "",
      buttons: ['bold', 'italic', 'justifyCenter', 'justifyLeft', 'quote', 'anchor']
    });
    $('.editable p').before(this.insertToolbar())
    $('.editable').focus();
    this.$('#tags-select').selectivity({
      inputType: 'Email'
    });
    $('.tt').tooltip({
      placement: 'bottom',
      trigger: 'hover'
    })
    $('p').tooltip({
      placement: 'top',
      trigger: 'manual'
    });
    $('#header-imager').tooltip({
      placement: 'top',
      trigger: 'hover'
    });
    $('.selectivity-multiple-input-container').css('background', 'transparent');
    return this;
  },

  addButton: function (event) {
    var tb = this.insertToolbar();
    event.preventDefault();
    if (event.keyCode === 13) {
      $(event.target).children().each( function () {
        if ($(this).is('p') && !$(this).prev().is('.insert-toolbar')) {
          $(this).before(tb);
        }
      });
    }
  },

  addImage: function () {
    filepicker.setKey("AFA8IlPkxSNC1BPrgoHtsz");

    filepicker.pick(
      {
        mimetypes:'image/*',
        services:'COMPUTER'
      },
      function (Blob) {
        var image = Blob.url;
        this.model.set("header_image", image);
        this.$('.image').html("<img src='" + image + "'>");
      }.bind(this)
    )
  },

  showToolbar: function (event) {
    p = window.getSelection().focusNode
    $('p').each( function () {
      if ((this !== p) && $(this).prev().is('.insert-toolbar')) {
        $(this).prev().css('opacity', 0);
        $(this).prev().css('z-index', -1000);
        $(this).css('opacity', 1);
      } else {
        $(this).prev().first().css('opacity', 1);
        $(this).prev().first().css('z-index', 1000);
      }
    })
  },

  showHiddenButtons: function (event) {
    var buttons = $(event.currentTarget).parent().find('.hidden-buttons');
    if ($(buttons).css('visibility') == 'visible') {
      $(buttons).css('visibility', 'hidden')
    } else {
      $(buttons).css('visibility', 'visible')
    }
  },

  insertPic: function (event) {
    var $para = $(event.currentTarget).parent().parent().next();

    filepicker.setKey("AFA8IlPkxSNC1BPrgoHtsz");
    filepicker.pick(
      {
        mimetypes:'image/*',
        services:'COMPUTER'
      },
      function (Blob) {
        var image = Blob.url;
        console.log(image);
        $para.html("<img style='max-width:400px' src='" + image + "'>");
      }.bind(this)
    )
  },

  insertLine: function (event) {
    var $para = $(event.currentTarget).parent().parent().next();
    $para.html("<div style='width:100%'><hr noshade size=1 width='33%'><br></div>");
  },

  toolbarTooltip: function (event) {
    $('p').tooltip('show');
    setTimeout(function () {
      $('p').tooltip('destroy');
    }, 2500);
    $('.editable').off(event);
  },

  autoSave: function (event) {
    // debugger
    // event.preventDefault();
    $('.insert-toolbar').remove();
    this.model.set("body", this.$('.editable').html());
    this.model.set("title", $($('p')[0]).text());
    this.model.set("subtitle", $($('p')[1]).text());
    this.model.save(this.model.attributes, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        this.$('#modal-title').val($($('p')[0]).text());
        this.$('#modal-subtitle').val($($('p')[1]).text());
      }.bind(this)
    });

  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$('.confirm-form').serializeJSON();
    this.model.save(formData.story, {
      success: function () {
        var tags = $('#tags-select').find('.selectivity-multiple-selected-item');
        if (tags.first().text() !== "") {
          ttags = this.ttags;
          story = this.model
          var ids = [];
          tags.each(function () {
            tag = ttags.findWhere({ label: $(this).text() })
            if (tag === undefined) {
              tag = new Large.Models.Tag({ label: $(this).text()});
              tag.save(tag.attributes, {
                success: function () {
                  // ids.push(tag.id);
                  // ttags.add(tag, { merge: true })
                  var tagging = new Large.Models.Tagging({
                    taggable_id: story.id,
                    taggable_type: "Story",
                    tag_id: tag.id
                  });
                  tagging.save(tagging.attributes);
                }
              })
            } else {
              ids.push(tag.id);
            }
          })
          ids.forEach( function (i) {
            var tagging = new Large.Models.Tagging({
              taggable_id: story.id,
              taggable_type: "Story",
              tag_id: i
            });
            tagging.save(tagging.attributes);
          })
        }
        Backbone.history.navigate("stories/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
