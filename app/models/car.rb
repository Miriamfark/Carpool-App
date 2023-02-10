class Car < ApplicationRecord
    include PgSearch::Model
    belongs_to :user
    has_many :carpools
    has_many :kids, through: :carpools
    validates :seats_available, numericality: { greater_than_or_equal_to: 0 }
# method class search table 
    pg_search_scope :car_search,
    against: [:school, :dismissal_time, :monday, :tuesday, :wednesday, :thursday, :friday],
    using: {
        :tsearch => { :prefix => true }
    }
end
