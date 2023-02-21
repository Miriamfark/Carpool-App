class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create 
        user = User.find_by(name: params[:name])
        puts "params", user
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
            # what is going on here???
        else
            render json: { error: "Password is incorrect"}, status: :unauthorized  
        end     
    end

    def destroy
        session[:user_id] = nil
        head :no_content
    end
    
end
