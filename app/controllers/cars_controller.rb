class CarsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index 
        cars = Car.all 
        render json: cars
    end

    def show 
        car = find_car
        render json: car
    end

    def create 
        user = User.find(session[:user_id])
        car = user.cars.create!(car_params)
        render json: car
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def update 
        car = find_car
        car.update!(car_params)
        render json: car
    end 

    def destroy 
        car = find_car
        car.destroy
        head :no_content
    end 

    def search 
        if params[:school].length > 0
            cars = Car.car_search(params[:school])
        elsif params[:dismissal_time].length > 0
            cars = Car.car_search(params[:dismissal_time])
        end
            render json: cars
    end

    private

    def car_params 
        params.permit(:seats_available, :school, :dismissal_time, :monday, :tuesday, :wednesday, :thursday, :friday)
    end

    def find_car 
        Car.find(params[:id])
    end

    def render_not_found_response
        render json: { error: "Not found" }, status: :not_found
    end 

end
