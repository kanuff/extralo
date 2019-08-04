class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.integer :board_id, null: false
      t.integer :next_id
      t.integer :prev_id
      t.boolean :archived, default: false
      t.string :title, null: false
      t.timestamps
    end
    add_index :lists, :board_id
    add_index :lists, :next_id
    add_index :lists, :prev_id
  end
end
