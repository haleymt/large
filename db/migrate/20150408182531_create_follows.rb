class CreateFollows < ActiveRecord::Migration[7.0]
  def change
    create_table :follows do |t|
      t.integer :followable_id
      t.integer :follower_id
      t.string :followable_type

      t.timestamps null: false
    end
  end
end
