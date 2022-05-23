class DefaultAlignValue < ActiveRecord::Migration[7.0]
  def change
    change_column :publications, :header_align, :string, default: "center"
  end
end
