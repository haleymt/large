class Follow < ActiveRecord::Base
  validates :user, presence: true

  validates :follower_id, uniqueness: { scope: [:followable_id, :followable_type] }

  belongs_to :followable, polymorphic: true
  belongs_to :user, inverse_of: :follows
end
