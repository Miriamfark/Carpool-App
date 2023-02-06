class Carpool < ApplicationRecord
    belongs_to :kid
    belongs_to :car
    #validates :status, strings contain accepted, rejected, requested
end
