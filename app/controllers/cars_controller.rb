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

    def update_seats 
        car = Car.find(params[:id])
        seats = car.seats_available
        car.update!(seats_available: car.seats_available - 1)
        render json: car
    end

    def search 
        byebug
        cars = Car.where(school: params[:school], seats_available: params[:seats_available], dismissal_time: params[:dismissal_time], monday: params[:monday, tuesday: params[:tuesday], wednesday: params[:wednesday, thursday: params[:thursday], friday: params[:friday]]])
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
