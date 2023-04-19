class KidSerializer < ActiveModel::Serializer
  attributes :id, :name, :school, :dismissal_time, :cars, :user, :address
  has_many :cars
  belongs_to :user
end
