class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.new(user_params)
    if @user.save
      # debugger
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show # ONLY FOR TESTING
    @user = User.first
    render :show
  end



  private
  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end