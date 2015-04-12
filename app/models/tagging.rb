# == Schema Information
#
# Table name: taggings
#
#  id            :integer          not null, primary key
#  taggable_id   :integer          not null
#  tag_id        :integer          not null
#  taggable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Tagging < ActiveRecord::Base
  validates :taggable_id, :tag_id, :taggable_type, presence: true
  validates :tag_id, uniqueness: { scope: [:taggable_id, :taggable_type] }

  belongs_to :taggable, polymorphic: true
  belongs_to :tag, inverse_of: :taggings
end
