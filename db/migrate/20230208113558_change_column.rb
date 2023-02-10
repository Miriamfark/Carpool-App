class ChangeColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :cars, :monday, :string 
  end
end
