Large.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  followers: function () {
    if (this._followers === undefined) {
      this._followers = new Large.Collections.Users([])
    }
    return this._followers;
  },

  followedUsers: function () {
    if (this._followedUsers === undefined) {
      this._followedUsers = new Large.Collections.Users([])
    }
    return this._followedUsers;
  },

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

  contributedPubs: function () {
    if (this._contributedPubs === undefined) {
      this._contributedPubs = new Large.Collections.Publications([]);
    }
    return this._contributedPubs;
  },

  editedPubs: function () {
    if (this._editedPubs === undefined) {
      this._editedPubs = new Large.Collections.Publications([]);
    }
    return this._editedPubs;
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
      this.followings().set(payload.followings, { parse: true });
      delete payload.followings;
    }

    if (payload.contributed_pubs) {
      this.contributedPubs().set(payload.contributed_pubs, { parse: true });
      delete payload.contributed_pubs;
    }

    if (payload.edited_pubs) {
      this.editedPubs().set(payload.edited_pubs, { parse: true });
      delete payload.edited_pubs;
    }

    if (payload.followers) {
      this.followers().set(payload.followers, { parse: true });
      delete payload.followers;
    }

    if (payload.followed_users) {
      this.followedUsers().set(payload.followed_users, { parse: true });
      delete payload.followed_users;
    }

    return payload;
  }

});
