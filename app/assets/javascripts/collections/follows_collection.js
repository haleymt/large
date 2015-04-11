Large.Collections.Follows = Backbone.Collection.extend({
  url: '/api/follows',
  model: Large.Models.Follow,

  // getOrFetch: function (id) {
  //   var model = this.get(id);
  //   if (model === undefined) {
  //     model = new Large.Models.Follow({ id: id });
  //     model.fetch({
  //       success: function () {
  //         this.add(model);
  //       }.bind(this)
  //     });
  //   } else {
  //     model.fetch();
  //   }
  //   return model;
  // }
});
