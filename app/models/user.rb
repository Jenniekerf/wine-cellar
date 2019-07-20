class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :email, presence: true
  validates :email, uniqueness: true

  has_many :bottles
  has_many :comments
  has_many :commented_bottles, through: :comments, source: :bottle

def self.find_or_create_by_omniauth(auth_hash)
 self.where(:email => auth_hash["info"]["email"]).first_or_create do |user|
  user.password = SecureRandom.hex
    end
  end

end
