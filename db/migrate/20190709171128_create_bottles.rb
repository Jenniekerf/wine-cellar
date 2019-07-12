class CreateBottles < ActiveRecord::Migration[5.2]
  def change
    create_table :bottles do |t|
      t.string :name
      t.string :variety
      t.string :producer
      t.date :year
      t.string :category
      t.monetize :price

      t.timestamps
    end
  end
end
