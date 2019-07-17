class ChangeBottlesTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :bottles, :category_id
  end
end
