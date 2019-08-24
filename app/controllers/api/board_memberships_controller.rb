class Api::BoardMembershipsController < ApplicationController

    def create
        board_membership = BoardMembership.new()
        board_membership.board_id = params[:board_membership][:board_id]
        board_membership.user_id = params[:board_membership][:user_id]
        if board_membership.save
            render json: ["Success"]
        else
            render json: ["User is already a member of this board"]
        end
    end

end