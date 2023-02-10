class CarsController < ApplicationController
#error handling
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
        cars = Car.car_search(params[:school] || params[:dismissal_time] || params[:monday] || params[:tuesday] || params[:wednesday] || params[:thursday] || params[:friday])
        render json: cars
    end

    private

    def car_params 
        params.permit(:seats_available, :school, :dismissal_time, :monday, :tuesday, :wednesday, :thursday, :friday)
    end

    def find_car 
        Car.find(params[:id])
    end

end
