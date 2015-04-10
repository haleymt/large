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
    // this.listenTo(this.model, 'change', this.autoSave)
  },

  render: function () {
    // var elements = document.querySelectorAll('.editable');
    // var editor = new MediumEditor(elements);
    this.$el.html(this.template({ story: this.model, publications: this.publications }));
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
    var formData = this.$('.story-form').serializeJSON();
    this.model.save(formData.story, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        this.$('#modal-title').val(this.$('#title').val());
        this.$('#modal-subtitle').val(this.$('#subtitle').val());
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
