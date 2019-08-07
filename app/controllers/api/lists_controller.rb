class Api::ListsController < ApplicationController

    def index
        @lists = List.where({board_id: params[:board_id], archived: false })
        render :index
    end

    def create
        #need to optimize this in the future to use joins instead of iterations to find items
        @lists = []
        list = List.new(list_params)
        list.board_id = params[:board_id]
        board_lists = Board.find(params[:board_id]).lists.reject {|list| list.archived == true}
        old_leaf = board_lists.last.leaf if board_lists.length > 0
        if list.save
            if board_lists.length > 0
                old_leaf.insertNode(list)
                @lists << old_leaf
            end
            @lists << list
            render :multiShow
        end
    end

    def update
        @lists = []
        list = List.find(params[:id])
        child = list.child
        parent = list.parent
        List.removeNode(list)
        parent.insertNode(child) if list.parent && list.child
        child.prev_id = nil if list.child && !list.parent
        parent.next_id = nil if !list.child && list.parent
        if list.update(list_params)
            parent.save! if parent
            child.save! if child
            list.parent.insertNode(list) if list.parent
            list.insertNode(list.child) if list.child
            @lists.concat([list, parent, child, list.parent, list.child])
            debugger
            render :multiShow
        end
    end

    def destroy
        @lists = []
        list = List.find(params[:id])
        if list.prev_id
            parent = List.find(list.prev_id) 
            parent.next_id = nil
            if list.next_id
                child = List.find(list.next_id) 
                child.prev_id = parent.id
                parent.next_id = child.id
            end
        elsif list.next_id
            child = List.find(list.next_id)
            child.prev_id = nil
        end
        List.removeNode(list)
        list.archived = true
        if list.save!
            @lists << list
            @lists << parent if parent
            @lists << child if child
            render :multiShow
        end
    end

    private
    def list_params
        params.require("list").permit(:title, :next_id, :prev_id)
    end
end