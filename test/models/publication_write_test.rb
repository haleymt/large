# == Schema Information
#
# Table name: publication_writes
#
#  id         :integer          not null, primary key
#  writer_id  :integer          not null
#  pub_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class PublicationWriteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
