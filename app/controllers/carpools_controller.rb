class CarpoolsController < ApplicationController

    def index 
        carpools = Carpool.all 
        render json: carpools
    end

    def create
        car = Car.find(params[:car_id]) 
        kid = Kid.find(params[:kid_id])
        if car.kids.find_by(id: params[:kid_id])
            render json: { error: "This kid is already in the car"}, status: 401
        elsif car.seats_available < 1
            render json: { error: "There are no more seats in this car"}, status: 401
        elsif car.school != kid.school
            render json: { error: "Wrong school!" }, status: 401
        elsif car.dismissal_time != kid.dismissal_time
            render json: { error: "Wrong time!" }, status: 401
        else
            car.update(seats_available: car.seats_available - 1)
            carpool = Carpool.create!(carpool_params)
            if carpool
                KidAddedMailer.carpool_request(carpool, car, kid).deliver_now
            end
            render json: { car: car, carpool: carpool }, status: :created 
        end
    end

    def destroy
        carpool = Carpool.find_by(car_id: params[:car_id], kid_id: params[:kid_id])
        if carpool 
            KidAddedMailer.kid_left_carpool(carpool).deliver_now
        end
        carpool.destroy
        car = Car.find(params[:car_id]) 
        car.update(seats_available: car.seats_available + 1)
        render json: car, status: :ok
    end

    def show 
        carpool = Carpool.find(params[:id])
        render json: carpool
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
    end

    def update 
       carpool = Carpool.find(params[:id])
       carpool.update!(carpool_params)
       if carpool 
          KidAddedMailer.request_accepted(carpool).deliver_now
       end
       render json: carpool 
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
    end

    def reject 
        carpool = Carpool.find(params[:id])
        if car = Car.find(carpool.car_id)
            car.update(seats_available: car.seats_available + 1)
        end
        if carpool 
            KidAddedMailer.request_rejected(carpool).deliver_now
        end
        carpool.destroy
        head :no_content
    rescue ActiveRecord::RecordNotFound
        render json: { error: "Not found" }, status: :not_found
    end

    private 

    def carpool_params 
        params.permit(:kid_id, :car_id, :status)
    end
end
