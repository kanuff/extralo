# == Schema Information
#
# Table name: boards
#
#  id          :bigint           not null, primary key
#  creator_id  :integer          not null
#  title       :string           not null
#  description :string
#  starred     :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Board < ApplicationRecord
  validates :title, :creator_id, presence: true
  validates :starred, inclusion: {in: [true, false]}

  belongs_to :creator,
  primary_key: :id,
  foreign_key: :creator_id,
  class_name: :User
end
