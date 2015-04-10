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

  parse: function (payload) {
    
    if (payload.stories) {
      this.stories().set(payload.stories, { parse: true });
      delete payload.stories
    }

    if (payload.follows) {
      this.follows().set(payload.follows, { parse: true });
      delete payload.follows
    }

    return payload;
  }

  // if (payload.followers) {
  //   this.followers().set(payload.followers, { parse: true });
  //   delete payload.followers
  // }
  //
  // if (payload.follow) {
  //   if (payload.follow.isNew()) {
  //     var follow = new Backbone.Model.Follow( { followable_id: this.id, followable_type: "Publication" });
  //     pub.follows.add(follow)
  //   } else {
  //     payload.follow.destroy!
  //   }
  // }

});
