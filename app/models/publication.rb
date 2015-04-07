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

class Publication < ActiveRecord::Base
end
