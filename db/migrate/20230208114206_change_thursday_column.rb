class ChangeThursdayColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :cars, :thursday, :string 

  end
end
