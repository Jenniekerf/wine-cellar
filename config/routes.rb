Rails.application.routes.draw do



  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/auth/github/callback' => 'sessions#create'
  get '/bottles/home' => 'bottles#home'
  get '/bottles/cheap' => 'bottles#cheap'
  get '/bottles/moderate' => 'bottles#moderate'
  get '/bottles/fancy' => 'bottles#fancy'
  get '/bottles/red_wine' => 'bottles#red_wine'
  get '/bottles/white_wine' => 'bottles#white_wine'
  get '/bottles/orange_wine' => 'bottles#orange_wine'
  get '/bottles/rose_wine' => 'bottles#rosé_wine'
  get '/bottles/sparkling_wine' => 'bottles#sparkling_wine'
  get '/bottles/dessert_wine' => 'bottles#dessert_wine'
  get '/bottles/home_index' => 'bottles#home_index'
  post '/bottles/home_index' => 'bottles#create'

  resources :bottles do
    resources :comments
  end

  resources :users

  root 'sessions#home'

end
