class SessionsController < ApplicationController
  skip_before_action :require_login

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:user][:username])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to bottles_path
    else
      redirect_to '/login'
    end
  end

  def home
  end

  def destroy
    session.clear
    flash[:notice] = "You have successfully logged out."
    redirect_to '/'
  end
end
