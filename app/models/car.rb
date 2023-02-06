class Car < ApplicationRecord
    belongs_to :user
    has_many :carpools
    has_many :kids, through: :carpools
    validates :seats_available, numericality: { greater_than_or_equal_to: 0 }
    
    # def unique_kids
    #      self.kids.uniq 
    # end

end
