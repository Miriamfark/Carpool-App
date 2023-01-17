class Carpool < ApplicationRecord
    has_many :kids
    has_many :cars
    #validates :status, strings contain accepted, rejected, requested
end
