class CommentSerializer < ActiveModel::Serializer
  attributes :id, :tasting_note
  belongs_to :bottle
  belongs_to :commentor,
             :class_name => "User",
             :foreign_key => "user_id", optional: true


end
