# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create(email: 'guest', password: 'password', description: 'A guest at Large')
u2 = User.create(email: 'bill_shakespeare', password: 'password2', description: 'A writer of many fine tales')
u3 = User.create(email: 'oliver_twist', password: 'password3', description: 'Can I have some more?')
u4 = User.create(email: 'regina_filange', password: 'password4', description: 'This account does not represent the views of my employer!!')
u5 = User.create(email: 'hodor', password: 'password5', description: 'hodor')
