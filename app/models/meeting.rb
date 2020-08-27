require 'date'
class Meeting < ApplicationRecord
	belongs_to :candidate, class_name: "User"
	belongs_to :recruiter, class_name: "User"
	
	validate :satrt_time_and_end_time
	validate :overlaps, on: :create
	validate :schedule_update, on: :update


	private

	def overlaps
	
		candidate_meetings = overlaps_util(Meeting.where(candidate_id: candidate_id))
				
		if candidate_meetings.count >= 1
			errors.add(:errors, "Conflicting time. Candidate not available")
		end

		recruiter_meetings = overlaps_util(Meeting.where(recruiter_id: recruiter_id))		
		if recruiter_meetings.count >= 1
			errors.add(:errors, "Conflicting time. Recruiter not available")
		end

	end

	def overlaps_util(meetings)
		meetings = meetings.where( :start_time => ["start_time IN (?)",(start_time.to_datetime)..(end_time.to_datetime-1.seconds)] ) 
				.or	(meetings.where( :end_time => ["end_time IN (?)",(start_time.to_datetime + 1.seconds)..(end_time.to_datetime)]))
		return meetings

	end

	def satrt_time_and_end_time
		difference = ((DateTime.parse(end_time.to_s) - DateTime.parse(start_time.to_s))*24*60).to_i

		if start_time<DateTime.now()
			errors.add(:errors, "Start time can't be in past")
		# elsif start_time > DateTime.now() + 1.year
		# 	errors.add(:start_time, "should be within one year duration")
		elsif start_time > end_time
			errors.add(:errors, "Start time can't be less than end time")
		elsif difference < 10
			errors.add(:errors, "Duration should be atleast 10 minutes")
		end
	end

	def schedule_update
	
		candidate_meetings = overlaps_util(Meeting.where.not(id: id).where(candidate_id: candidate_id))
				
		if candidate_meetings.count >= 1
			errors.add(:errors, "conflicting time. candidate not available")
		end

		recruiter_meetings = overlaps_util(Meeting.where.not(id: id).where(recruiter_id: recruiter_id))		
		if recruiter_meetings.count >= 1
			errors.add(:errors, "conflicting time. recruiter not available")
		end

	end

end
