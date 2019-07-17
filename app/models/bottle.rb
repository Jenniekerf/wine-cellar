class Bottle < ApplicationRecord
  scope :cheap, -> { where(price_cents: 0..20) }
  scope :moderate, -> { where(price_cents: 21..40) }
  scope :fancy, -> { where(price_cents: 41..Float::INFINITY)}
  scope :red_wine, -> { where(category: "Red") }
  scope :white_wine, -> { where(category: "White") }
  scope :rosé_wine, -> { where(category: "Rosé") }
  scope :sparkling_wine, -> { where(category: "Sparkling") }
  scope :orange_wine, -> { where(category: "Orange") }
  scope :dessert_wine, -> { where(category: "Dessert") }

  belongs_to :user
  has_many :comments
  has_many :commentors, through: :comments, source: :commentor
end
