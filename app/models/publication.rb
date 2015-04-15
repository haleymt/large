# == Schema Information
#
# Table name: publications
#
#  id           :integer          not null, primary key
#  owner_id     :integer          not null
#  title        :string           not null
#  description  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  header_image :text
#

class Publication < ActiveRecord::Base
  include Followable

  validates :owner_id, :title, presence: true

  has_many(
    :stories,
    class_name: :Story,
    foreign_key: :pub_id,
    primary_key: :id
  )

  belongs_to(
    :owner,
    class_name: :User,
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :pub_edits,
    class_name: :PublicationEdit,
    foreign_key: :pub_id,
    primary_key: :id
  )

  has_many(
    :pub_writes,
    class_name: :PublicationWrite,
    foreign_key: :pub_id,
    primary_key: :id
  )

  has_many :writers, through: :pub_writes, source: :writer
  has_many :editors, through: :pub_edits, source: :editor
end
