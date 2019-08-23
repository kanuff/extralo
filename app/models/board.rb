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
  attr_reader :member_ids, :root_list

  belongs_to :creator,
  primary_key: :id,
  foreign_key: :creator_id,
  class_name: :User

  has_many :memberships,
  primary_key: :id,
  foreign_key: :board_id,
  class_name: :BoardMembership

  has_many :members,
  through: :memberships,
  source: :user

  has_many :lists,
  primary_key: :id,
  foreign_key: :board_id,
  class_name: :List

  has_many :cards,
  through: :lists,
  source: :cards

  def root_list_id
    return lists.first.root.id if lists.first
    nil
  end
  
  def member_ids
    members.pluck(:id)
  end

end
