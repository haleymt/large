module Followable
  extend ActiveSupport::Concern

  included do
    has_many :follows, as: :followable,
      class_name: :Follow,
      dependent: :destroy

    has_many :followers,
      through: :follows,
      source: :follower
  end

  def num_followers
    self.follows.length
  end

end
