Large.Collections.Publications = Backbone.Collection.extend({
  url: 'api/publications',
  model: Large.Models.Publication,

  getOrFetch: function (id) {
    var model = this.get(id);
    if (model === undefined) {
      model = new Large.Models.Publication({id: id});
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
