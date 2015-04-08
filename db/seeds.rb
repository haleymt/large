# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create(email: 'hifriend@gmail.com', password: 'password', id: 2)

s1 = Story.create(title: "title", subtitle: "subtitle", author_id: 2, pub_id: 1)
