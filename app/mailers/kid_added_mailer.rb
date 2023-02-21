class KidAddedMailer < ApplicationMailer
    default from: 'me@example.com'

  def welcome_email
    @user = params[:user]
    mail(to: @user[:email], subject: 'Welcome to My Awesome Site')
  end
end
