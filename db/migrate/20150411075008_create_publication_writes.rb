class CreatePublicationWrites < ActiveRecord::Migration
  def change
    create_table :publication_writes do |t|
      t.integer :writer_id, null: false, index: true
      t.integer :pub_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
