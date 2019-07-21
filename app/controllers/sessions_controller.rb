class SessionsController < ApplicationController
  skip_before_action :require_login

  def new
    @user = User.new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
       @user = User.find_or_create_by_omniauth(auth_hash)
       session[:user_id] = @user.id

       redirect_to bottles_path
    else
    @user = User.find_by(:email => params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id

      redirect_to bottles_path
    else
      flash[:error] = "Invalid login name or password. Try again!."
      redirect_to '/login'
    end
  end
end

  def destroy
    session.clear
    flash[:notice] = "You have successfully logged out!"
    redirect_to '/'
  end

end
