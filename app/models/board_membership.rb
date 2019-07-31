# == Schema Information
#
# Table name: board_memberships
#
#  id          :bigint           not null, primary key
#  user_id     :integer          not null
#  board_id    :integer          not null
#  can_comment :boolean          default(FALSE)
#  can_edit    :boolean          default(FALSE)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class BoardMembership < ApplicationRecord
  validates :user_id, :board_id, presence: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :board,
  primary_key: :id,
  foreign_key: :board_id,
  class_name: :Board
end
