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

require 'test_helper'

class PublicationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
