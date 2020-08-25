class Api::V1::MeetingsController < ApplicationController
			def index	
				meetings = Meeting.all.order('candidate_id ASC');
				# render json: {status: 'SUCCESS',message: 'Loaded meetings',
				# 				data: meetings},
				# 				status: :ok
				render json: meetings
			end

			 def show
				meeting = Meeting.find(params[:id])
				render json: {status: 'SUCCESS', message: 'Loaded meeting',
								data: meeting},
								status: :ok
			end

			def create
				meeting = Meeting.new(meeting_params)

				if meeting.save
					render json: {status: 'SUCCESS',message: 'Meeting Scheduled',
									data: meeting}, 
									status: :ok
				else
					render json: {status: 'ERROR',message: 'Meeting not saved',
									data: meeting.errors},
									status: :unprocessable_entity 
				end
			end

			def destroy
		        meeting = Meeting.find(params[:id])
		        meeting.destroy
		        render json: {status: 'SUCCESS', message:'Deleted meeting', 
		        				data:meeting},
		        				status: :ok
		    end

		    def update
		        meeting = Meeting.find(params[:id])
		        if meeting.update_attributes(meeting_params)
		          render json: {status: 'SUCCESS', message:'Updated meeting', 
		          					data:meeting},
		          					status: :ok
		        else
		          render json: {status: 'ERROR', message:'Meeting not updated', 
		          					data:meeting.errors},
		          					status: :unprocessable_entity
		        end
		    end

			private
			def meeting_params
				params.permit( :start_time, :end_time,
								:candidate_id,
								:recruiter_id)
			end
end
