# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  label      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  validates :label, presence: true
  validates :label, uniqueness: true

  has_many(
    :taggings,
    class_name: :Tagging,
    foreign_key: :tag_id
  )
end
