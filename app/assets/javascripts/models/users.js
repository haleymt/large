Large.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  follows: function () {
    if (this._follows === undefined) {
      this._follows = new Large.Collections.Follows([],
      { followable_id: this.id, followable_type: "User" });
    }
    return this._follows;
  },

  followings: function () {
    if (this._followings === undefined) {
      this._followings = new Large.Collections.Follows([],
      { follower_id: this.id });
    }
    return this._followings;
  },

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

    if (payload.stories) {
      this.stories().set(payload.stories, { parse: true });
      delete payload.stories;
    }

    if (payload.publications) {
      this.pubs().set(payload.publications, { parse: true });
      delete payload.publications;
    }

    if (payload.follows) {
      this.follows().set(payload.follows, { parse: true });
      delete payload.follows;
    }

    if (payload.followings) {
      this.followings().set(payload.follows, { parse: true });
      delete payload.followings;
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
  //     var follow = new Backbone.Model.Follow( { followable_id: this.id, followable_type: "User" });
  //     pub.follows.add(follow)
  //   } else {
  //     payload.follow.destroy!
  //   }
  // }

});
