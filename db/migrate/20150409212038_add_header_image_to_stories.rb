class AddHeaderImageToStories < ActiveRecord::Migration[7.0]
  def change
    add_column :stories, :header_image, :text
  end
end
