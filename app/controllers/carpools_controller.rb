class CarpoolsController < ApplicationController

    def index 
        carpools = Carpool.all 
        render json: carpools
    end

    def create 
       carpool = Carpool.create!(carpool_params)
       render json: carpool, status: :created 
    end

    def destroy
        # carpool
    end

    private 

    def carpool_params 
        params.permit(:kid_id, :car_id)
    end
end
