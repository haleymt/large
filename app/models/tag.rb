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

  def tagged_pubs
    pubs = []
    self.taggings.each do |tagging|
      if tagging.taggable_type == "Publication"
        pubs << Publication.find(tagging.taggable_id)
      end
    end
    return pubs
  end

  def tagged_stories
    stories = []
    self.taggings.each do |tagging|
      if tagging.taggable_type == "Story"
        stories << Story.find(tagging.taggable_id)
      end
    end
    return stories
  end

end
