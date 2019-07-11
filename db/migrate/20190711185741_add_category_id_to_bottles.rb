class AddCategoryIdToBottles < ActiveRecord::Migration[5.2]
  def change
    add_column :bottles, :category_id, :integer
  end
end
