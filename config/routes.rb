Rails.application.routes.draw do
  resources :todos, defaults: { format: :json }
end
