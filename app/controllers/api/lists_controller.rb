class Api::ListsController < ApplicationController

    def index
        @lists = List.where(board_id: params[:board_id])
        render :index
    end

    def create
        @list = List.new(list_params)
        @list.board_id = params[:board_id]
        if @list.save
            render :show
        end
    end

    # def update
    # end

    # def destroy
    # end
    private
    def list_params
        params.require("list").permit(:title)
    end
end