Rails.application.routes.draw do



  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/bottles/home'
  get '/bottles/cheap'
  get '/bottles/moderate'
  get '/bottles/fancy'
  get '/bottles/red_wine' => 'bottles#red_wine'
  get '/bottles/white_wine' => 'bottles#white_wine'
  get '/bottles/orange_wine' => 'bottles#orange_wine'
  get '/bottles/rosé_wine' => 'bottles#rosé_wine'
  get '/bottles/sparkling_wine' => 'bottles#sparkling_wine'
  get '/bottles/dessert_wine' => 'bottles#dessert_wine'

  resources :bottles do
    resources :comments
  end
  resources :users

  root 'sessions#home'

end
