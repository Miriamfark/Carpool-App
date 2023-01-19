class Kid < ApplicationRecord
    belongs_to :user
    has_many :carpools
    has_many :cars, through: :carpools
end
