class Carpool < ApplicationRecord
    belongs_to :kid
    belongs_to :car
end
