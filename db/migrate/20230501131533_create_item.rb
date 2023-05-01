class CreateItem < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :description, null: false
      t.string :status, null: false
      t.references :todo, foreign_key: true, index: true

      t.timestamps
    end
  end
end
