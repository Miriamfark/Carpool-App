class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        # byebug
        user = User.create(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end


    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    rescue ActiveRecord::RecordNotFound
        render json: { error: "User not found" }, status: :not_found
    end

    private

    def user_params 
        params.permit(:name, :password, :password_confirmation)
    end
end
