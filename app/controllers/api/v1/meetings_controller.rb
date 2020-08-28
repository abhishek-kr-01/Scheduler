class Api::V1::MeetingsController < ApplicationController

	#controller to fetch all meetings
	def index
		meetings = Meeting.order(start_time: :asc);
        list = []
        meetings.each do |meet|
            list << meet.attributes.merge({"candidate_id" => meet.candidate, "recruiter_id" => meet.recruiter })
        end
        render json: {status: 200, message:'Loaded Meetings', data: list},status: :ok
	end

	def create
		meeting = Meeting.new(meeting_params)
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
		list = []
		list << meeting.attributes.merge({"candidate_id" => meeting.candidate, "recruiter_id" => meeting.recruiter})
        if meeting
	      render json: {status: 200, message:'Loaded meeting details', data: list},status: :ok
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
