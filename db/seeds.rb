# Role.create( {title: "candidate"} )
# Role.create( {title: "recruiter"} )
3.times do
	User.create({
		name: Faker::Name.name,
		email: Faker::Internet.email,
		role_id: 2
	})
end
10.times do
	User.create({
		name: Faker::Name.name,
		email: Faker::Internet.email,
		role_id: 1
	})
end


