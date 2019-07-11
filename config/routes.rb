Rails.application.routes.draw do



  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  resources :bottles
  resources :users

  root 'bottles#index'

end
