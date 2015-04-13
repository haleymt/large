Large.Views.PubAbout = Backbone.View.extend({
  template: JST['publications/pub_about'],

  initialize: function (options) {
    this.pub = options.pub;
    this.editors = this.pub.editors();
    this.writers = this.pub.writers();
    this.listenTo(this.pub, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      pub: this.pub,
      writers: this.writers,
      editors: this.editors
    });

    this.$el.html(content);
    return this;
  }
})
