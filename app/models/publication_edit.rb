# == Schema Information
#
# Table name: publication_edits
#
#  id         :integer          not null, primary key
#  editor_id  :integer          not null
#  pub_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PublicationEdit < ActiveRecord::Base
  validates :editor_id, :pub_id, presence: true
  validates :editor_id, uniqueness: { scope: [:pub_id] }

  belongs_to(
    :editor,
    class_name: :User,
    foreign_key: :editor_id,
    primary_key: :id
  )

  belongs_to(
    :publication,
    class_name: :Publication,
    foreign_key: :pub_id,
    primary_key: :id
  )
end
