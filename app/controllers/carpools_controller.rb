class CarpoolsController < ApplicationController

    def index 
        carpools = Carpool.all 
        render json: carpools
    end

    def create
        car = Car.find(params[:car_id]) 
        if car.kids.find_by(id: params[:kid_id])
            render json: { error: "This kid is already in the car"}, status: 401
        elsif car.seats_available < 1
            render json: { error: "There are no more seats in this car"}, status: 401
        else
            car.update(seats_available: car.seats_available - 1)
            carpool = Carpool.create!(carpool_params)
            render json: car, status: :created 
        end
    end

    def destroy
        carpool = Carpool.find_by(car_id: params[:car_id], kid_id: params[:kid_id])
        carpool.destroy
        car = Car.find(params[:car_id]) 
        car.update(seats_available: car.seats_available + 1)
        render json: car, status: :ok
    end

    private 

    def carpool_params 
        params.permit(:kid_id, :car_id)
    end
end
