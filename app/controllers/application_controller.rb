class ApplicationController < ActionController::Base
helper_method :logged_in?, :current_user
before_action :require_login

  def logged_in?
     !!current_user
  end

   def current_user
     @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
   end

   def require_login
     unless logged_in?
       flash[:error] = "You must be logged in to access this section"
       redirect_to login_path
     end
   end

end
