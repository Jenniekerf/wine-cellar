class ChangeCommentsColumnToComment < ActiveRecord::Migration[5.2]
  def change
    rename_column :comments, :comments, :comment
  end
end
