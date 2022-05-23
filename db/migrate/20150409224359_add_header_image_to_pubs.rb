class AddHeaderImageToPubs < ActiveRecord::Migration[7.0]
  def change
    add_column :publications, :header_image, :text
  end
end
