Large.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  stories: function () {
    if (this._stories === undefined) {
      this._stories = new Large.Collections.Stories([], {
        author_id: this.id, author: this
      });
    }
    return this._stories;
  },

  pubs: function () {
    if (this._pubs === undefined) {
      this._pubs = new Large.Collections.Publications([], {
        owner_id: this.id, owner: this
      });
    }
    return this._pubs;
  },

  parse: function (payload) {
    // debugger
    if (payload.stories) {
      this.stories().set(payload.stories, { parse: true });
      delete payload.stories;
    }

    if (payload.publications) {
      this.pubs().set(payload.publications, { parse: true });
      delete payload.publications;
    }
    return payload;
  }

});
