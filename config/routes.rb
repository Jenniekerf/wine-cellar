Rails.application.routes.draw do



  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/bottles/home' 

  resources :bottles do
    resources :comments
  end
  resources :users

  root 'sessions#home'

end
