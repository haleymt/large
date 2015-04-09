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
  validates :user, presence: true

  validates :follower_id, uniqueness: { scope: [:followable_id, :followable_type] }

  belongs_to :followable, polymorphic: true
  belongs_to :user, inverse_of: :follows
end
