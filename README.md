# Large

[Heroku link][heroku]

[heroku]: http://medium-large.herokuapp.com

## Large is a clone of Medium.com built on Rails and Backbone. Users can:

- [X] Create accounts 
- [X] Create sessions 
- [X] Create stories
- [X] Create publications
- [X] View people and publications
- [X] Subscribe to people and publications
- [X] View a home feed of stories by subscribed people and publications
- [X] People can edit and write for publications
- [X] Leave responses on stories (new Story object)
- [X] Tag stories
- [X] Search by keyword
- [X] Refine searches by people, publications, and tags

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Story Creation (~1 day)
I will implement user authentication using either Twitter or Facebook  accounts (what Medium uses), or the more standard App Academy style, depending on which is more feasible and appropriate.
By the end of this phase, users should be able to create stories using a simple Rails view form. Users should also be able to create publications, again with a simple form.
The priority of this stage is getting the app up and running and pushed to Heroku.


[Details][phase-one]

### Phase 2: Viewing Publications and Stories (~2 days)
I will add API routes to serve story and publication data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to create publications and publish their stories within certain publications. Users will be able to view publications, stories, and user profiles populated by the stories the user has written. If a story has been published in a publication, it will be visible on both the user's and the publication's profile.
Users can create stories in response to other stories.
All functionality will be within a single Backbone app.


[Details][phase-two]

### Phase 3: Editing and Displaying Stories (~2 days)
I plan to use third-party libraries to add functionality to the `StoryForm`, `Confirm Publish`, `PubForm` and
`StoryShow` views in this phase. In particular, I'm looking for a library that will allow users to style text without knowing Markdown or HTML. Filepicker for file upload so users can add images to stories. I will have to add a `Tag` class so users can tag posts in the confirm stage.

[Details][phase-three]

### Phase 4: User Feeds (~1 days)
During this phase I'll implement the site's landing page, which doubles as a user's feed. If the user is signed in, a `feed` route will be populated using the `current_user`'s `followed_people` and `followed_pubs` associations. If not signed in, the `feed` route will correspond with the admin user's feed (perhaps a random selection, at this point).
A `HomeShow` view will have a `posts` collection that fetches from the `feed` route. The feed will be ordered chronologically by publish date.
This stage is where I will implement the user's ability to follow users and publications.

[Details][phase-four]

### Phase 5: Searching for Users, Stories and Publications (~2 days)
I will add `search` routes to Users, Publications, Stories, and Tags. There will be a complementary Backbone view for `SearchShow`, a composite view made up up `PubIndex`, `StoryIndex`, `UsersIndex`, and `TagIndex` subviews.
These views will fetch from the collections that already exist for each of the models.

[Details][phase-five]

### Bonus Features (in progress)
- [ ] Leave notes on stories
- [ ] Receive notifications
- [ ] User icons
- [ ] Import stories
- [ ] Share stories for editing
- [ ] View a feed of Top Stories
- [ ] Show sidebar of featured tags and top stories on home page
- [ ] Recommend stories
- [ ] Bookmark stories



[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
