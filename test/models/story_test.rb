# == Schema Information
#
# Table name: stories
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  pub_id       :string
#  title        :string
#  subtitle     :string
#  body         :text
#  story_id     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  header_image :text
#

require 'test_helper'

class StoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
