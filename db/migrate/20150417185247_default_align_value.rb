class DefaultAlignValue < ActiveRecord::Migration
  def change
    change_column :publications, :header_align, :string, default: "center"
  end
end
