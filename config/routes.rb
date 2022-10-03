Rails.application.routes.draw do
  
  resources :orders, only: [:index, :create,:update]
   resources :likes , only: [:index, :create,:update, :destroy]
   resources :items, only: [:index, :create, :update, :destroy]
   resources :users
   get "/likes_data", to:"likes#index"
   get "/orders_data", to:"orders#index"
   get "/users_data", to:"users#index"
   get "/users/:id/likes", to:"users#likes"
  get "/item_data", to:"items#index"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
