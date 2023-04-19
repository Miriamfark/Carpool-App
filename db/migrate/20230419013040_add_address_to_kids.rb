class AddAddressToKids < ActiveRecord::Migration[6.1]
  def change
    add_column :kids, :address, :string
  end
end
