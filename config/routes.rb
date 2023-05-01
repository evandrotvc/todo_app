Rails.application.routes.draw do
  resources :todos, defaults: { format: :json } do
    resources :items, defaults: { format: :json }
  end
end
