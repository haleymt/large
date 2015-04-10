Large.Views.NewStory = Backbone.View.extend({
  template: JST['stories/new_story'],

  events: {
    "click #header-image": "addImage",
    "click #submit-confirm": "submitForm",
    "click #confirm": "autoSave"
  },

  initialize: function (options) {
    this.collection = options.collection;
    this.publications = options.publications;
    this.listenTo(this.publications, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({ story: this.model, publications: this.publications }));
    var editor = new MediumEditor('.editable', {
      buttons: ['bold', 'italic', 'header1', 'header2', 'header3', 'justifyCenter', 'quote', 'anchor']
    });
    return this;
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
        console.log(image);
        this.model.set("header_image", image);
      }.bind(this)
    )
  },

  autoSave: function (event) {
    event.preventDefault();

    this.model.set("title", this.$('#title').text());
    this.model.set("subtitle", this.$('#subtitle').text());
    this.model.set("body", this.$('#story-body').text());

    this.model.save(this.model.attributes, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        this.$('#modal-title').val(this.$('#title').text());
        this.$('#modal-subtitle').val(this.$('#subtitle').text());
      }.bind(this)
    });

  },

  submitForm: function (event) {
    event.preventDefault();
    var formData = this.$('.confirm-form').serializeJSON();
    this.model.save(formData.story, {
      success: function () {
        Backbone.history.navigate("stories/" + this.model.id, { trigger: true })
      }.bind(this)
    })
  }
});
