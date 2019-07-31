class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.integer :creator_id, null: false
      t.string :title, null: false
      t.string :description
      t.boolean :starred, default: false
      t.timestamps
    end
    add_index :boards, :creator_id
  end
end
