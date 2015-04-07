Large.Views.PubShow = Backbone.View.extend({
  template: JST['publications/pub_show'],

  initialize: function (options) {
    this.pub = options.pub;
    this.stories = this.pub.stories();

    this.listenTo(this.pub, 'sync', this.render);
    this.listenTo(this.stories, 'add', this.render);
  },

  render: function () {
    var content = this.template({ pub: this.pub, stories: this.stories });
    this.$el.html(content);

    return this;
  }
});
