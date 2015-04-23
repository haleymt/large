# Phase 2: Viewing Publications and Stories

## Rails
### Models

### Controllers
Api::PublicationsController (create, destroy, index, show)
Api::UsersController (create, destroy, index, show)
Api::StoriesController (create, destroy, index, show, update)

### Views
* pubs/show.json.jbuilder
* users/show.json.jbuilder

## Backbone
### Models
* Publication
* Story
* User

### Collections
* Publication
* Story
* User

### Views
* PubForm
* PubShow (composite view, contains StoriesIndex subview)
* UserShow (composite view, contains StoriesIndex subview)
* StoriesIndex (composite view, contains StoriesIndexItem subviews)
* StoriesIndexItem
* StoryForm
* StoryShow (composite view, contains StoryForm subview for responses)
* ConfirmPublish
* Your Stories

## Gems/Libraries
