class User < ActiveRecord::Base
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  has_many :bottles
  has_many :comments
  has_many :commented_bottles, through: :comments
end
