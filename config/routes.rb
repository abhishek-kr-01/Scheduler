Rails.application.routes.draw do
 	namespace 'api' do
		namespace 'v1' do
			get 'meetings/index'
			get 'users/index'
      		post 'meetings/create'
      		put 'meetings/update'
      		delete '/destroy/:id', to: 'meetings#destroy'
      		
			resources :users
			resources :meetings
			resources :roles
		end
	end
	root 'homepage#index'
  	get '/*path' => 'homepage#index'
end