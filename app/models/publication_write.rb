# == Schema Information
#
# Table name: publication_writes
#
#  id         :integer          not null, primary key
#  writer_id  :integer          not null
#  pub_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PublicationWrite < ActiveRecord::Base
  validates :writer_id, :pub_id, presence: true
  validates :writer_id, uniqueness: { scope: [:pub_id] }

  belongs_to(
    :writer,
    class_name: :User,
    foreign_key: :writer_id,
    primary_key: :id
  )

  belongs_to(
    :publication,
    class_name: :Publication,
    foreign_key: :pub_id,
    primary_key: :id
  )
end
