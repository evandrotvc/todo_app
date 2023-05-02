Rails.application.routes.draw do
  resources :todos, defaults: { format: :json } do
    resources :items, defaults: { format: :json } do
      member do
        put :done
      end
    end
  end
end
