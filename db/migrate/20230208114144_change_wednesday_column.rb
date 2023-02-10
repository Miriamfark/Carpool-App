class ChangeWednesdayColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :cars, :wednesday, :string 

  end
end
