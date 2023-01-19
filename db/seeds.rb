# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "Miriam")

Kid.create(name: "Suri", school: "Toras Chaim", dismissal_time: 215, user_id: 1)

Car.create(user_id: 1, seats_available: 6, school: "Toras Chaim", dismissal_time: 215, monday: true, tuesday: true, wednesday: true, thursday: false, friday: false)

Carpool.create(kid_id: 1, car_id: 1)