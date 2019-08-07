# == Schema Information
#
# Table name: lists
#
#  id         :bigint           not null, primary key
#  board_id   :integer          not null
#  next_id    :integer
#  prev_id    :integer
#  archived   :boolean          default(FALSE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List < ApplicationRecord
    validates :board_id, :title, presence: true
    validates :archived, inclusion: {in: [true, false]}
    validate :cannot_child_self, :cannot_parent_self, :cannot_parent_and_child_node

    attr_reader :root, :card_ids

    belongs_to :board,
    primary_key: :id,
    foreign_key: :board_id,
    class_name: :Board

    belongs_to :prev,
    primary_key: :id,
    foreign_key: :prev_id,
    class_name: :List,
    required: false

    has_one :next,
    primary_key: :id,
    foreign_key: :next_id,
    class_name: :List,
    required: false

    has_many :cards,
    primary_key: :id,
    foreign_key: :list_id,
    class_name: :Card

    def card_ids
        card_ids = []
        cards.each do |card|
            card_ids << card.id
        end
        card_ids
    end

    def parent
        return List.new() if !self.prev_id
        List.find(self.prev_id)
    end
    
    def child
        return List.new() if !self.next_id
        List.find(self.next_id)
    end

    def insertBetween(new_parent = "sentinel", new_child = "sentinel")
        # if this is called without passing any arguements,
        # it effectively deletes the node from the list
        # and correctly updates the surrounding nodes
        # debugger
        new_parent = List.new() if new_parent == "sentinel"
        new_child = List.new() if new_child == "sentinel"
        # debugger
        old_parent = self.parent
        old_child = self.child
        old_parent.next_id = old_child.id
        old_child.prev_id = old_parent.id
        # debugger
       

        new_child.prev_id = self.id
        new_parent.next_id = self.id

        # debugger


        # handle edge case where old_parent == new_child (swap)
        if old_parent.id == new_child.id
            old_parent.next_id = self.next_id
            new_child.next_id = self.next_id
            old_parent.prev_id = self.id
            new_child.prev_id = self.id
        end

        if new_parent.id == old_child.id
            new_parent.prev_id = self.prev_id
            old_child.prev_id = self.prev_id
            new_parent.next_id = self.id
            old_child.next_id = self.id
        end

        self.next_id = new_child.id
        self.prev_id = new_parent.id
        # debugger

        List.transaction do 
            old_parent.save! if old_parent.id
            old_child.save! if old_child.id
            newSelf = List.update(self.id, self.attributes)
            new_parent.save! if new_parent.id
            new_child.save! if new_child.id
        end

        # returns an array of all the nodes that were updated
        return [
            self,
            old_child,
            old_parent,
            new_parent,
            new_child,
        ].reject {|list| list.id == nil}

    end

    # def insertNode(list)
    #     #update prev child node if exists
    #     if self.next_id
    #         oldChild = List.find(self.next_id)
    #         oldChild.prev_id = list.id 
    #     end
    #     #update new child node
    #     list.next_id = self.next_id
    #     list.prev_id = self.id
    #     #update current parent node
    #     self.next_id = list.id
    #     #save all changes together or not at all
    #     List.transaction do
    #         if oldChild
    #             oldChild.save!
    #         end
    #         self.save!
    #         list.save!
    #     end
    #     list.next_id
    # end

    def self.removeNode(list)
        return if (list.next_id == nil) && (list.prev_id == nil)
        parent = list.prev_id ? List.find(list.prev_id) : nil
        child =  list.next_id ? List.find(list.next_id) : nil

        if parent && child          #if node was in the middle of a list
            parent.next_id = child.id
            child.prev_id = parent.id
        elsif parent && !child      #if it was the last node in the list
            parent.next_id = nil
        else                        # if it was the root node in the list
            child.prev_id = nil
        end
        list.next_id = nil
        list.prev_id = nil

        List.transaction do
            parent.save! if parent
            child.save! if child
            list.save!
        end
        list
    end

    def root # THESE ARE N + 1 QUERIES, FIND WAY TO FIX (dynamically create joins?)
        prev_id = self.prev_id || self.id
        return self if prev_id == self.id
        while prev_id
            root_id = prev_id
            prev_id = List.find(prev_id).prev_id
        end
        List.find(root_id)
    end

    def leaf # THESE ARE N + 1 QUERIES, FIND WAY TO FIX (dynamically create joins?)
        prev_id = self.prev_id || self.id
        next_id = self.next_id || self.id
        return self if next_id == self.id
        while next_id
            leaf_id = next_id
            next_id = List.find(next_id).next_id
        end
        List.find(leaf_id)
    end



    ## Custom validations for linked-list behavior
    def cannot_parent_self
        errors.add(:prev_id, "Cannot be parent to itself") if prev_id == id && id
    end

    def cannot_child_self
        errors.add(:next_id, "Cannot be child to itself") if next_id == id && id
    end

    def cannot_parent_and_child_node
        if prev_id || next_id
            errors.add(:next_id, "Cannot be child to itself") if next_id == prev_id
        end
    end
end
