class Bottle < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  has_many :comments
  has_many :commentors, through: :comments
end
