class AddHeaderImageToStories < ActiveRecord::Migration
  def change
    add_column :stories, :header_image, :text
  end
end
