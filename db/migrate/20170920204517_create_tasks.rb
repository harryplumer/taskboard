class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.string :color
      t.date :due_date, null: false
      t.boolean :complete, default: false
      t.belongs_to :category, foreign_key: true

      t.timestamps
    end
  end
end
