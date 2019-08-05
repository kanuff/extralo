class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.integer :list_id, null: false
      t.integer :next_id
      t.integer :prev_id
      t.boolean :archived, default: false
      t.string :title, null: false
    end
    add_index :cards, :list_id
    add_index :cards, :next_id
    add_index :cards, :prev_id
  end
end
 