class HeaderAlignColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :publications, :header_align, :string
  end
end
