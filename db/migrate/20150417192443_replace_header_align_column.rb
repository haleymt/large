class ReplaceHeaderAlignColumn < ActiveRecord::Migration
  def change
    remove_column :publications, :header_align
    add_column :publications, :header_align, :string
  end
end
