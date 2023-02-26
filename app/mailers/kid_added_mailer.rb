class KidAddedMailer < ApplicationMailer

  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to The Carpool App')
  end

  def carpool_request(carpool, car, kid)
    @kid = kid.name
    @car = car
    @url = "http://localhost:4000/request_pending/#{carpool.id}"
    mail(to: @car.user.email, subject: "#{@kid} Requested to Join Your Carpool" )
  end

  def request_accepted(carpool)
    @carpool = carpool
    mail(to: @carpool.kid.user.email, subject: "#{@carpool.car.user.name} Accepted Your Request")
  end

  def request_rejected(carpool)
    @carpool = carpool
    mail(to: @carpool.kid.user.email, subject: "#{@carpool.car.user.name} Rejected Your Request")
  end

  def kid_left_carpool(carpool)
    @carpool = carpool
    mail(to: @carpool.car.user.email, subject: "#{@carpool.kid.name} Left Your Carpool")
  end
  
end
