Large.Collections.Taggings = Backbone.Collection.extend({
  url: 'api/taggings',
  model: Large.Models.Tagging,

  getOrFetch: function (id) {
    var model = this.get(id);
    if (model === undefined) {
      model = new Large.Models.Tagging({ id: id });
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
