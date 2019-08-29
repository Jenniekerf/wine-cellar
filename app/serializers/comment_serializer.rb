class CommentSerializer < ActiveModel::Serializer
  attributes :id, :tasting_note
  belongs_to :bottle
end
