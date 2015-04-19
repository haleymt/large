module Taggable
  extend ActiveSupport::Concern

  included do
    has_many :taggings,
      as: :taggable,
      class_name: :Tagging,
      dependent: :destroy

    has_many :tags,
      through: :taggings,
      source: :tag
  end
end
