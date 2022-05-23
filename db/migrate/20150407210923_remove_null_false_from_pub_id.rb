class RemoveNullFalseFromPubId < ActiveRecord::Migration[7.0]
  def change
    change_column :stories, :pub_id, :string, null: true, index: true
  end
end
