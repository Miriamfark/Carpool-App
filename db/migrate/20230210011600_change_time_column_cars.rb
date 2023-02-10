class ChangeTimeColumnCars < ActiveRecord::Migration[6.1]
  def change
    change_column :cars, :dismissal_time, :string
  end
end
