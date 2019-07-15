class Bottle < ApplicationRecord
  scope :cheap, -> { where(price_cents: 0..20) }
  scope :moderate, -> { where(price_cents: 21..40) }
  scope :fancy, -> { where(price_cents: 41..Float::INFINITY)}

  belongs_to :user
  belongs_to :category, optional: true
  has_many :comments
  has_many :commentors, through: :comments, source: :commentor
end

#source: :bottle (try this again if not working)
