class Api::V1::MeetingsController < ApplicationController
	def index	
		meeting = Meeting.all.order(created_at: :desc)
		render json: meeting
	end

	def create
		meeting = Meeting.new(meeting_params)
		# meeting = Meeting.create!(meeting_params)
		if meeting.save
			render json: {status: 200,
							message: "Success",
						 	data:meeting}
		else
			render json: {status: 400,
							message: "Bad Request",
						 	data:meeting.errors}
		end
	end

	def show
		if meeting
	      render json: meeting
	    else
	      render json: meeting.errors
	  	end
	end	

	def destroy
        meeting = Meeting.find(params[:id])
        meeting.destroy
        render json: { message: 'Meeting deleted!' }
    end

    def update
        if meeting.update_attributes(meeting_params)
          render json: meeting
        else
          render json: meeting.errors
        end
    end

	private
	def meeting_params
		params.permit( :start_time, :end_time,
						:candidate_id,
						:recruiter_id)
	end

	def meeting
		@meeting ||= Meeting.find(params[:id])
	end
end
