class UsersController < ApplicationController
  skip_before_action :require_login

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    render json: @user, status: 200
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id]=@user.id
      redirect_to bottles_path
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

end
