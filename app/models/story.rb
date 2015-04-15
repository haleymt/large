# == Schema Information
#
# Table name: stories
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  pub_id       :string
#  title        :string
#  subtitle     :string
#  body         :text
#  story_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  header_image :text
#

class Story < ActiveRecord::Base
  include Taggable
  validates :author_id, presence: true

  belongs_to(
    :author,
    class_name: :User,
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :publication,
    class_name: :Publication,
    foreign_key: :pub_id,
    primary_key: :id
  )

  has_many(
    :responses,
    class_name: :Story,
    foreign_key: :story_id,
    primary_key: :id
  )

  belongs_to(
    :story,
    class_name: :Story,
    foreign_key: :story_id,
    primary_key: :id
  )
end
