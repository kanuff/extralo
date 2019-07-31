# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


demoUser = User.create(name: "Matthew", email:"hunter12@gmail.com", password: "hunter12")

boards = Board.create([
  {creator_id: User.first.id, title: "Garden Landscaping", description: "Earth'n'worms", starred: false},
  {creator_id: User.first.id, title: "Spy on the Competition", description: "A Different Kind of Bug", starred: false},
  {creator_id: User.first.id, title: "Website Creation", description: "Somehow still something about bugs", starred: true}
])