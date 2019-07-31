class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password],
    ) 
    if @user
      login!(@user)
      render :show
    else
      render json: ["Username/password do not match"], status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ["You are not logged in"], status: 404
    end
  end
end