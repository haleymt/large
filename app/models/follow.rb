# == Schema Information
#
# Table name: follows
#
#  id              :integer          not null, primary key
#  followable_id   :integer
#  follower_id     :integer
#  followable_type :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Follow < ActiveRecord::Base
  validates :follower_id, presence: true

  validates :follower_id, uniqueness: { scope: [:followable_id, :followable_type] }

  belongs_to :followable, polymorphic: true
  belongs_to :follower, class_name: :User, inverse_of: :followings
end
