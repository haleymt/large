class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.integer :owner_id, null: false, index: true
      t.string :title, null: false
      t.string :description

      t.timestamps null: false
    end
  end
end
