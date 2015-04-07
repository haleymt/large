Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users
  resources :sessions

  namespace :api, defaults: { format: :json } do
    resources :publications
    resources :stories
  end
end
