Rails.application.routes.draw do

  resources :kids, :cars, :carpools
  delete 'carpool/delete', to: "carpool#destroy"
  get '/search/:search_term', to: "cars#search"
  patch 'cars/:id/seats', to: "cars#update_seats"

  post '/signup', to: "users#create"  
  get '/me', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
