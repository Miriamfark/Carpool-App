class ChangeTimeColumn < ActiveRecord::Migration[6.1]
  def change
    change_column :kids, :dismissal_time, :string 

  end
end
