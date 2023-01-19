class KidsController < ApplicationController

    def index 
        kids = Kid.all 
        render json: kids
    end

end
