Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, except: [:show, :index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :publications do
      member do
        get :about
      end
    end
    resource :search, only: [:show]
    resources :stories
    resources :users, except: [:destroy]
    # do
    #   member do
    #     get :your_stories
    #   end
    # end
    resources :follows, only: [:create, :destroy, :index]
    resources :taggings
    resources :tags
    resources :publication_edits, only: [:create, :index, :destroy]
    resources :publication_writes, only: [:create, :index, :destroy]
  end
end
