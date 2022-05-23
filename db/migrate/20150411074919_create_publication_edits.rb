class CreatePublicationEdits < ActiveRecord::Migration[7.0]
  def change
    create_table :publication_edits do |t|
      t.integer :editor_id, null: false, index: true
      t.integer :pub_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
