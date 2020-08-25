class AddFields < ActiveRecord::Migration[6.0]
  def change
  	change_table(:meetings) do |t|
        t.references :candidate, foreign_key: { to_table: 'users' }
        t.references :recruiter, foreign_key: { to_table: 'users' }
  	end
  end
end
