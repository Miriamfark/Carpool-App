class Car < ApplicationRecord
    belongs_to :user
    has_many :carpools
    has_many :kids, through: :carpools
end
