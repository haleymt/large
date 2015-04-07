class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :author_id, null: false, index: true
      t.integer :pub_id, null: false, index: true
      t.string :title, null: false
      t.string :subtitle
      t.text :body
      t.integer :story_id, index: true

      t.timestamps null: false
    end
  end
end
