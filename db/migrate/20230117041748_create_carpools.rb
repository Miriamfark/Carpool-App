class CreateCarpools < ActiveRecord::Migration[6.1]
  def change
    create_table :carpools do |t|
      t.integer :kid_id
      t.integer :car_id
      t.string :status
      t.timestamps
    end
  end
end
