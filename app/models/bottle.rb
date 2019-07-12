class Bottle < ApplicationRecord

  belongs_to :user
  belongs_to :category, optional: true
  has_many :comments
  has_many :commentors, through: :comments, source: :commentor
end

#source: :bottle
