class CarSerializer < ActiveModel::Serializer
  attributes :id, :seats_available, :school, :dismissal_time, :monday, :tuesday, :wednesday, :thursday, :friday, :kids, :user
  has_many :kids
end
