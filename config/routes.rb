Rails.application.routes.draw do
  # get 'homepage/index'
	namespace 'api' do
		namespace 'v1' do
			resources :users
			resources :meetings
			resources :roles
		end
	end
	root 'homepage#index'
end
