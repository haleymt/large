# == Schema Information
#
# Table name: publications
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  title       :string           not null
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Publication < ActiveRecord::Base
  validates :owner_id, :title, presence: true

  has_many(
    :stories,
    class_name: :Story,
    foreign_key: :pub_id,
    primary_key: :id
  )
end
