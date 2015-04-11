Large.Views.PubAbout = Backbone.View.extend({
  template: JST['publications/pub_about'],

  initialize: function (options) {
    this.pub = options.pub;
    this.listenTo(this.pub, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ pub: this.pub });
    this.$el.html(content);
    return this;
  }
})
