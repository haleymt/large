module Followable
  extend ActiveSupport::Concern

  included do
    has_many :follows, as: :followable,
      class_name: :Follow,
      dependent: :destroy
  end

  def num_followers
    self.follows.length
  end

end
