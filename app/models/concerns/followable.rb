module Followable
  extend ActiveSupport::Concern

  included do
    has_many :follows, as: :followable,
      class_name: :Follow,
      dependent: :destroy
  end

  def followers
    self.follows.sum(:value)
  end

end
