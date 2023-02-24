class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        if user
            KidAddedMailer.welcome_email(user).deliver_now
        end
        render json: user, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end


    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    rescue ActiveRecord::RecordNotFound
        render json: { error: "User not found" }, status: :not_found
    end

    private

    def user_params 
        params.permit(:name, :password, :password_confirmation, :email)
    end
end
