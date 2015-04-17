class HeaderAlignColumn < ActiveRecord::Migration
  def change
    add_column :publications, :header_align, :string
  end
end
