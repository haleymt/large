Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, except: [:show, :index]
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :publications do
      member do
        get :about
      end
    end
    resource :search, only: [:show]
    resources :stories
    resources :users, only: [:show, :index]
    resources :follows, only: [:create, :destroy, :index]
    resources :taggings, only: [:create, :destroy, :index]
    resources :tags, only: [:create, :destroy, :index, :show]
    resources :publication_edits, only: [:create, :index, :destroy]
    resources :publication_writes, only: [:create, :index, :destroy]
  end
end
