Large.Models.Story = Backbone.Model.extend({
  urlRoot: 'api/stories',

  ttags: function () {
    if (this._tags === undefined) {
      this._tags = new Large.Collections.Tags([]);
    }
    return this._tags
  },

  taggings: function () {
    if (this._taggings === undefined) {
      this._taggings = new Large.Collections.Taggings([],
      { taggable_id: this.id, taggable_type: "Story"});
    }
    return this._taggings;
  },
  
  parse: function (payload) {
    if (payload.taggings) {
      this.taggings().set(payload.taggings, { parse: true });
      delete payload.taggings
    }

    if (payload.tags) {
      this.ttags().set(payload.tags, { parse: true });
      delete payload.tags
    }

    return payload;
  }
});
