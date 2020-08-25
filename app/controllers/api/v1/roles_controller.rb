module Api
	module V1
		class RolesController < ApplicationController

			def index
				roles = Role.order('created_at ASC');
				render json: {status: 'SUCCESS',
								message: 'Loaded roles',
								data: roles},
								status: :ok
			end
			
		end
	end
end
