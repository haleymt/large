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
    resources :stories
    resources :users, only: [:show, :index]
    resources :follows, only: [:create, :destroy, :index]
  end
end
