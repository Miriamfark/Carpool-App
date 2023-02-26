class CarpoolSerializer < ActiveModel::Serializer
  attributes :id, :status
  belongs_to :kid
  belongs_to :car
end
