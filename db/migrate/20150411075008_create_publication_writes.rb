class CreatePublicationWrites < ActiveRecord::Migration[7.0]
  def change
    create_table :publication_writes do |t|
      t.integer :writer_id, null: false, index: true
      t.integer :pub_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
