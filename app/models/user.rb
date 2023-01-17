class User < ApplicationRecord
    has_secure_password
    has_many :kids
    has_many :cars
    validates :name, uniqueness: true
    validates :password, presence: true
end
