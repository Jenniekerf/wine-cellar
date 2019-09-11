class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :bottles
  has_many :comments
  has_many :commented_bottles, through: :comments, source: :bottle
end
