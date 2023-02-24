class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create 
        user = User.find_by(name: params[:name])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render nil , status: 401 
        end     
    end

    def destroy
        session[:user_id] = nil
        head :no_content
    end
    
end
