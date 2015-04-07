Large.Collections.Users = Backbone.Collection.extend({
  url: '/users',
  model: Large.Models.User,

  getOrFetch: function (id) {
    var model = this.get(id);
    if (model === undefined) {
      model = new Large.Models.User({id: id});
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
