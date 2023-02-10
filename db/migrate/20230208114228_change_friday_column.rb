class ChangeFridayColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :cars, :friday, :string 

  end
end
