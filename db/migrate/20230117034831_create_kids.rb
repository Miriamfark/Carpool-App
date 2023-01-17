class CreateKids < ActiveRecord::Migration[6.1]
  def change
    create_table :kids do |t|
      t.string :name
      t.string :school
      t.time :dismissal_time
      t.integer :user_id
      t.integer :carpool_id
      t.timestamps
    end
  end
end
