class BottleSerializer < ActiveModel::Serializer
  attributes :id, :name, :variety, :producer, :year, :price_cents, :price_currency
  belongs_to :user
  has_many :comments
end
