class BoardsController < ApplicationController


  def index
    @boards = Boards.all
    render :index
  end

  def create
  end

  def show
  end

  def update
  end

  def destroy
  end

end