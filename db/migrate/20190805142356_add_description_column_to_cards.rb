class AddDescriptionColumnToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :description, :string
  end
end
