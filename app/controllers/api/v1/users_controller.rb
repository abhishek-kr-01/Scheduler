module Api
	module V1
		class UsersController < ApplicationController

			def index
				users = User.all.order(id: :asc)
				render json: users
			end

			def show
				user = User.find(params[:id])
				render json: user
			end

			def update
		        user = User.find(params[:id])
		        if user.update_attributes(user_params)
		          render json: {status: 'SUCCESS', message:'Updated user', 
		          					data:user},
		          					status: :ok
		        else
		          render json: {status: 'ERROR', message:'User not updated', 
		          					data:user.errors},
		          					status: :unprocessable_entity
		        end
		    end

		    private
			def user_params
				params.permit( :name, :email,
								:role_id)
			end
			
		end
	end
end
