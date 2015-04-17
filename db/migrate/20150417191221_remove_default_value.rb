class RemoveDefaultValue < ActiveRecord::Migration
  def change
    change_column_default(:publications, :header_align, nil)
  end
end
