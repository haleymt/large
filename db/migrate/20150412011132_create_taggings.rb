class CreateTaggings < ActiveRecord::Migration[7.0]
  def change
    create_table :taggings do |t|
      t.integer :taggable_id, null: false, index: true
      t.integer :tag_id, null: false, index: true
      t.string :taggable_type, null: false

      t.timestamps null: false
    end
  end
end
