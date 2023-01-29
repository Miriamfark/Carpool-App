class CarSerializer < ActiveModel::Serializer
  attributes :id, :seats_available, :school, :dismissal_time, :monday, :tuesday, :wednesday, :thursday, :friday
  belongs_to :user
end
