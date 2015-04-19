Large.Models.Tag = Backbone.Model.extend({
  urlRoot: "api/tags",

  taggings: function () {
    if (this._taggings === undefined) {
      this._taggings = new Large.Collections.Taggings([]);
    }
    return this._taggings;
  },

  taggedStories: function () {
    if (this._taggedStories === undefined) {
      this._taggedStories = new Large.Collections.Stories([]);
    }
    return this._taggedStories;
  },

  taggedPubs: function () {
    if (this._taggedPubs === undefined) {
      this._taggedPubs = new Large.Collections.Publications([]);
    }
    return this._taggedPubs;
  },

  parse: function (payload) {
    if (payload.taggings) {
      this.taggings().set(payload.taggings, { parse: true });
      delete payload.taggings
    }

    if (payload.tagged_stories) {
      this.taggedStories().set(payload.tagged_stories, { parse: true });
      delete payload.tagged_stories
    }

    if (payload.tagged_pubs) {
      this.taggedPubs().set(payload.tagged_pubs, { parse: true });
      delete payload.tagged_pubs
    }
    return payload
  }
});
