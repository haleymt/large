Large.Collections.Stories = Backbone.Collection.extend({
  url: 'api/stories',
  model: Large.Models.Story,

  comparator: function (story) {
    return card.get('created_at');
  },

  getOrFetch: function (id) {
    var model = this.get(id);
    if (model === undefined) {
      model = new Large.Models.Story({id: id});
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
