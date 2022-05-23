class MakeTitleNullAllowed < ActiveRecord::Migration[7.0]
  def change
    change_column_null :stories, :title, true
  end
end
