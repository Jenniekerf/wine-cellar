Rails.application.routes.draw do



  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/bottles/home'
  get '/bottles/cheap'
  get '/bottles/moderate'
  get '/bottles/fancy' 

  resources :bottles do
    resources :comments
  end
  resources :users

  root 'sessions#home'

end
