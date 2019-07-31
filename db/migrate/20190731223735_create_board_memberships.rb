class CreateBoardMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :board_memberships do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false
      t.boolean :can_comment, default: false
      t.boolean :can_edit, default: false
      t.timestamps
    end
    add_index :board_memberships, [:user_id, :board_id], unique: true
  end
end
