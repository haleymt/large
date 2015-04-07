class RemoveNullFalseFromPubId < ActiveRecord::Migration
  def change
    change_column :stories, :pub_id, :string, null: true, index: true
  end
end
