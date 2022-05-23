class RemoveDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column_default(:publications, :header_align, nil)
  end
end
