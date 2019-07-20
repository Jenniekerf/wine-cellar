class SessionsController < ApplicationController
  skip_before_action :require_login

  def new
    @user = User.new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      oauth_email = request.env["omniauth.auth"]["email"]
    if @user = User.find_by(email: oauth_email)
      session[:user_id] = @user.id
      redirect_to bottles_path
    else
      @user = User.create(:email => oauth_email)
      session[:user_id] = @user.id
      redirect_to bottles_path
    end
    else
    @user = User.find_by(username: params[:user][:username])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to bottles_path
    else
      redirect_to '/login'
    end
  end
end

  def destroy
    session.clear
    flash[:notice] = "You have successfully logged out."
    redirect_to '/'
  end

end
