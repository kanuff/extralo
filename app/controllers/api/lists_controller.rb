class Api::ListsController < ApplicationController

    def index
        @lists = List.where({board_id: params[:board_id], archived: false })
        render :index
    end

    def create
        #need to optimize this in the future to use joins instead of iterations to find items
        list = List.new(list_params)
        list.board_id = params[:board_id]
        board_lists = Board.find(params[:board_id]).lists.reject {|list| list.archived == true}
        old_leaf = board_lists.last.leaf if board_lists.length > 0
        if list.save
            if board_lists.length > 0
                @lists = list.insertBetween(old_leaf, "sentinel")
                render :multiShow
            else
                @lists = []
                @lists << list
                render :multiShow
            end
        end
    end

    def update
        # debugger
        list = List.find(params[:id])
        @lists = []

        if params[:list][:order_change] == "true"
            new_child = params[:list][:next_id] == 'sentinel' ? "sentinel" : List.find(params[:list][:next_id]) 
            new_parent = params[:list][:prev_id] == 'sentinel' ? "sentinel" : List.find(params[:list][:prev_id])
            if @lists = list.insertBetween(new_parent, new_child)
                render :multiShow
            end
        else
            if list.update(list_params)
                @lists << list 
                render :multiShow
            end
        end
    end

    def destroy
        list = List.find(params[:id])
        list.archived = true
        if list.save!
            @lists = list.insertBetween()
            render :multiShow
        end
    end

    private
    def list_params
        params.require("list").permit(:title, :next_id, :prev_id, :order_change)
    end
end