class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
       t.string :item_name
      t.integer :item_price
      t.string :item_type
      t.string :item_url
      t.timestamps
    end
  end
end
