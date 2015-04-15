class MakeTitleNullAllowed < ActiveRecord::Migration
  def change
    change_column_null :stories, :title, true
  end
end
