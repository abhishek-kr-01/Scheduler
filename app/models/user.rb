class User < ApplicationRecord

	has_many :candidate_meetings, class_name: "Meeting", foreign_key: "candidate_id"
  	has_many :recruiter_meetings, class_name: "Meeting", foreign_key: "recruiter_id"
  	has_one :role

  	validates :name, presence: true
	validates :email, presence: true
	validates :role_id, presence: true

end
