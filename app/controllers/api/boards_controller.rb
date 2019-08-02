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
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def show
    @board = Board.find(params[:board][:id])
    render :show
  end

  def update
    @board = Board.new(board_params)
    if @board.update
      render :show
    else
      render json: @board.errors.full_messages, status: 422
    end
  end

  def destroy
    @board = Board.find(params[:board][:id])
    @board.destroy
    render json: {}
  end

  private
  def board_params
    params.require(:board).permit(:title, :description, :starred)
  end

end