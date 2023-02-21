Rails.application.routes.draw do

  resources :kids, :cars
  resources :carpools, only: [:index, :create]
  post '/carpools/delete', to: "carpools#destroy"
  post '/search', to: "cars#search"
  patch '/cars/:id/seats', to: "cars#update_seats"
  post '/signup', to: "users#create"  
  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  patch '/my_cars/:id', to: "cars#update"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
