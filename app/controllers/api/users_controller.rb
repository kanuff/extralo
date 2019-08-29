class Api::UsersController < ApplicationController


  def index
    @users = User.where("name LIKE ?", "#{params[:name]}%")
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end