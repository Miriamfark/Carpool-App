class User < ApplicationRecord
    has_secure_password
    has_many :kids
    has_many :cars
    has_many :carpools, through: :cars
    has_many :carpools, through: :kids
    validates :name, uniqueness: true
    validates :password, presence: true
    validates :email, presence: true, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/
end
