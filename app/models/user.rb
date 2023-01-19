class User < ApplicationRecord
    # has_secure_password
    has_many :kids
    has_many :cars
    has_many :carpools, through: :cars
    validates :name, uniqueness: true
    # validates :password, presence: true
end
