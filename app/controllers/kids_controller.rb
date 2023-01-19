class KidsController < ApplicationController

    def index 
        kids = Kid.all 
        render json: kids
    end

    def show 
        kid = Kid.find(params[:id])
        render json: kid
    end

end
