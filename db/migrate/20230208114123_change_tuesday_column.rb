class ChangeTuesdayColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :cars, :tuesday, :string 

  end
end
