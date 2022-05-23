class AddHeadersAndIcons < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :header_image, :text
    add_column :users, :icon_image, :text
    add_column :publications, :icon_image, :text
  end
end
