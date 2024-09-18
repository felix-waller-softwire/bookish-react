Rails.application.routes.draw do
  resources :books, shallow: true do
    resources :copies
  end
end
