class ReplaceHeaderAlignColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :publications, :header_align
    add_column :publications, :header_align, :string
  end
end
