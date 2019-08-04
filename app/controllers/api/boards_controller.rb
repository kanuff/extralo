class Api::BoardsController < ApplicationController

  def index
    @boards = Board.joins(:memberships).where(:board_memberships => {:user_id => current_user.id})
    render :index
  end

  def create
    @board = Board.new(board_params)
    if current_user
      @board.creator_id = current_user.id
    else
      render json: ["You must be logged in to create a board"], status: 422
      return
    end
    if @board.save
      BoardMembership.create(user_id: current_user.id, board_id: @board.id)
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    board_id = params[:id]
    @board = Board.joins(:memberships).find_by(:board_memberships => {:user_id => current_user.id, :board_id => board_id})
    if @board
      render :show
    else
      render json: ["You don't have permission to view that board"], status: 401
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    render json: {}
  end

  private
  def board_params
    params.require(:board).permit(:title, :description, :starred)
  end

end