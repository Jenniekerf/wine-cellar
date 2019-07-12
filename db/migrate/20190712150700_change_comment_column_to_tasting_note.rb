class ChangeCommentColumnToTastingNote < ActiveRecord::Migration[5.2]
  def change
    rename_column :comments, :comment, :tasting_note
  end
end
