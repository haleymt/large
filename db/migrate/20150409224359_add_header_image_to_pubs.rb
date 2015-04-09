class AddHeaderImageToPubs < ActiveRecord::Migration
  def change
    add_column :publications, :header_image, :text
  end
end
