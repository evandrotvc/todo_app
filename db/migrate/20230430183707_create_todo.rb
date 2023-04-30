class CreateTodo < ActiveRecord::Migration[7.0]
  def change
    create_table :todos, id: :uuid do |t|

      t.string :title, null: false
      t.string :status, null: false
      t.timestamps
    end
  end
end
