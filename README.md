# Phase 5 Project: The Carpool App

Finally! a tool to schedule carpool for your kids in one central, easy place. 

## Project Purepose

The Carpool App is a tool for parents to have platform for connecting with other parents who are driving their kids to the same school at the same time. A user can sign up for an account, add their child(ren) to their profile, let other parents know when they are available to drive carpool, and add their kid(s) to another carpool.

## Features

- User can sign up for an account with a password
- User receives a welcome email on signup
- User can log in and stay logged in on a page refresh
- User can log out
- Once logged in, user sees their profile with their kids' names and driving duties
- User can add, edit, and remove a kid
- User can add, edit and remove their cars
- User can browse through the total list of carpools
- User can search for a carpool by school name or dismissal time
- User can add their child to a carpool by sending the driver a join request
- Driver of carpool is sent a link to either accept or reject the request
- User can remove their child from a carpool
- Driver of carpool is sent a notification that  child has left their carpool


## How To Use

1. Start by forking and cloning this github repository.
3. Navigate into the client folder and install all dependencies from the frontend by running 
`$npm install`
4. Start the frontend server by running 
`$npm start`
5. Open a new terminal tab and install all dependencies from the backend server by running
`$ bundle install`
6. Run `rails db:create`, `rails db:migrate`, and `rails db:seed`
7. Start the backend server by running
 `$rails s`

## Technologies Used
Rails, React, Postgresql database, Action Mailer, Letter_opener gem, Bootstrap CSS

#### Note: This app is an SPA (single page application)
