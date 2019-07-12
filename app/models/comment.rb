class Comment < ApplicationRecord
  belongs_to :commentor,
             :class_name => "User",
             :foreign_key => "user_id", optional: true
  belongs_to :bottle, optional: true

end
