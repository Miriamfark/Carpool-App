class KidsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        user = find_user
        kids = user.kids.all 
        render json: kids
    end

    def show 
        kid = find_kid
        render json: kid
    end

    def create
        user = find_user
        kid = user.kids.create!(kid_params) 
        render json: kid
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def update 
        kid = find_kid
        kid.update!(kid_params)
        render json: kid
    end

    def destroy 
        kid = find_kid
        kid.destroy
        head :no_content
    end

    private 

    def kid_params
        params.permit(:name, :school, :dismissal_time, :address) 
    end

    def find_user
        User.find(session[:user_id])
    end

    def find_kid 
        Kid.find(params[:id])
    end


    def render_not_found_response
        render json: { error: "Not found" }, status: :not_found
    end
end
