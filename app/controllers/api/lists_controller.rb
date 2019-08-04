class Api::ListsController < ApplicationController

    def index
        @lists = List.where(board_id: params[:board_id])
        render :index
    end
end