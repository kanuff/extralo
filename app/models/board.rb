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

  def root_list_id
    lists.first.root.id
  end

  def member_ids #this seems ugly --> is there a better way of doing it?
    member_ids = []
    members.each do |member|
      member_ids << member.id
    end
    member_ids
  end

  # def list_ids
  #   list_ids = []
  #   lists.each do |list|
  #     list_ids << list.id
  #   end
  #   list_ids
  # end

end
