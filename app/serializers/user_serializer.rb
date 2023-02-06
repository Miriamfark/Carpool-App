class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :kids
  has_many :cars

end
