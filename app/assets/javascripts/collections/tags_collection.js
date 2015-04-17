Large.Collections.Tags = Backbone.Collection.extend({
  url: 'api/tags',
  model: Large.Models.Tag,

  getOrFetch: function (id) {
    var model = this.get(id);
    if (model === undefined) {
      model = new Large.Models.Tag({ id: id });
      model.fetch({
        success: function () {
          this.add(model);
        }.bind(this)
      });
    } else {
      model.fetch();
    }
    return model;
  }
});
