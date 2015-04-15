Large.Models.Publication = Backbone.Model.extend({
  urlRoot: 'api/publications',

  followers: function () {
    if (this._followers === undefined) {
      this._followers = new Large.Collections.Users([])
    }
    return this._followers;
  },

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

  pubWrites: function () {
    if (this._pubWrites === undefined) {
      this._pubWrites = new Large.Collections.PubWrites([], {
        pub_id: this.id
      })
    }
    return this._pubWrites
  },

  pubEdits: function () {
    if (this._pubEdits === undefined) {
      this._pubEdits = new Large.Collections.PubEdits([], {
        pub_id: this.id
      })
    }
    return this._pubEdits
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
    // debugger
    if (payload.stories) {
      this.stories().set(payload.stories, { parse: true });
      delete payload.stories
    }

    if (payload.follows) {
      this.follows().set(payload.follows, { parse: true });
      delete payload.follows
    }

    if (payload.pub_edits) {
      this.pubEdits().set(payload.pub_edits, { parse: true });
      delete payload.pub_edits
    }

    if (payload.pub_writes) {
      this.pubWrites().set(payload.pub_writes, { parse: true });
      delete payload.pub_writes
    }

    if (payload.writers) {
      this.writers().set(payload.writers, { parse: true });
      delete payload.writers
    }

    if (payload.editors) {
      this.editors().set(payload.editors, { parse: true });
      delete payload.editors
    }

    if (payload.followers) {
      this.followers().set(payload.followers, { parse: true });
      delete payload.followers;
    }

    return payload;
  }

});
