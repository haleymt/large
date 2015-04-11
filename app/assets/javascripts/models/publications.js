Large.Models.Publication = Backbone.Model.extend({
  urlRoot: 'api/publications',

  follows: function () {
    if (this._follows === undefined) {
      this._follows = new Large.Collections.Follows([],
      { followable_id: this.id, followable_type: "Publication"});
    }
    return this._follows;
  },

  stories: function () {
    if (this._stories === undefined) {
      this._stories = new Large.Collections.Stories([], {
        pub_id: this.id, publication: this
      });
    }
    return this._stories;
  },

  writers: function () {
    if (this._writers === undefined) {
      this._writers = new Large.Collections.Users([])
    }
    return this._writers
  },

  editors: function () {
    if (this._editors === undefined) {
      this._editors = new Large.Collections.Users([])
    }
    return this._editors
  },

  parse: function (payload) {

    if (payload.stories) {
      this.stories().set(payload.stories, { parse: true });
      delete payload.stories
    }

    if (payload.follows) {
      this.follows().set(payload.follows, { parse: true });
      delete payload.follows
    }

    if (payload.editors) {
      this.editors().set(payload.editors, { parse: true });
      delete payload.editors
    }

    if (payload.writers) {
      this.writers().set(payload.writers, { parse: true });
      delete payload.writers
    }

    return payload;
  }

});
