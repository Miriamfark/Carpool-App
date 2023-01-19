class CarsController < ApplicationController

    def index 
        cars = Car.all 
        render json: cars
    end

    def show 
        car = Car.find(params[:id])
        render json: car
    end

    def create 
        user = User.find(session[:user_id])
        car = user.cars.create!(car_params)
        render json: car
    end

    def destroy 
        car = Car.find(params[:id])
        car.destroy
        head :no_content
    end 

    private

    def car_params 
        params.permit(:seats_available, :school, :dismissal_time, :monday, :tuesday, :wednesday, :thursday, :friday)
    end

end
