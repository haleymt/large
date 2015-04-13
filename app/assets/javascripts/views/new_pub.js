Large.Views.NewPub = Backbone.View.extend({
  template: JST['publications/new_pub'],

  events: {
    "submit": "submitForm",
    "click #align-left": "alignLeft",
    "click #align-center": "alignCenter",
    "click #pub-header-image": "addHeaderImage",
    "click #pub-icon": "addIcon"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.users = options.users;
  },

  render: function () {
    this.$el.html(this.template({ publication: this.model, users: this.users }));
    return this;
  },

  alignLeft: function () {

  },

  alignCenter: function () {

  },

  addHeaderImage: function () {
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
