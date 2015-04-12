# == Schema Information
#
# Table name: taggings
#
#  id            :integer          not null, primary key
#  taggable_id   :integer          not null
#  tag_id        :integer          not null
#  taggable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class TaggingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
