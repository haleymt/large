Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, except: [:show, :index]
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :publications
    resources :stories
    resources :users, only: [:show, :index]
    resources :follows, only: [:create, :destroy]
  end
end
