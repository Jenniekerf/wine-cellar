class Bottle < ApplicationRecord

  belongs_to :user
  belongs_to :category, optional: true
  has_many :comments
  has_many :commentors, through: :comments, source: :commentor
end

#source: :bottle (try this again if not working)
#add a scope method for price:
#cheap = where price<20
#moderate = where price is btw 20-40
#fancy = where price>40
