class Api::ListsController < ApplicationController

    def index
        @lists = List.where(board_id: params[:board_id])
        render :index
    end

    def create
        @list = List.new(list_params)
        @list.board_id = params[:board_id]
        if @list.save
            board_lists = Board.find(params[:board_id]).lists
            if board_lists.length > 1
                board_lists[-2].insertNode(@list)
            end
            render :show
        end
    end

    def update
        @list = List.find(params[:id])
        if @list.update(list_params)
            render :show
        end
    end

    def destroy
        @list = List.find(params[:id])
        List.removeNode(@list)
        @list.archived = true
        if @list.save!
            render :show
        end
    end

    private
    def list_params
        params.require("list").permit(:title)
    end
end