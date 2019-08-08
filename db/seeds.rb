# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Board.destroy_all
BoardMembership.destroy_all
List.destroy_all

demoUser = User.create!(name: "Matthew", email:"hunter12@gmail.com", password: "hunter12")

users = User.create!([
  {name: "Jim", email: "hunter13@gmail.com", password: "hunter12"},
  {name: "Pam", email: "hunter14@gmail.com", password: "hunter12"},
  {name: "Dwight", email: "hunter15@gmail.com", password: "hunter12"}
])

boards = Board.create!([
  {creator_id: User.first.id, title: "Garden Landscaping", description: "Earth'n'worms", starred: false},
  {creator_id: User.first.id, title: "Spy on the Competition", description: "A Different Kind of Bug", starred: false},
  {creator_id: User.first.id, title: "Website Creation", description: "Somehow still something about bugs", starred: true}
])

memberships = BoardMembership.create!([
  {user_id: User.first.id, board_id: boards.first.id},
  {user_id: User.first.id, board_id: boards.second.id},
  {user_id: users.first.id, board_id: boards.third.id},
  {user_id: users.second.id, board_id: boards.first.id},
  {user_id: users.second.id, board_id: boards.third.id},
  {user_id: users.third.id, board_id: boards.second.id}
])

lists = List.create!([
  {board_id: Board.first.id, title: "Herb Garden"},
  {board_id: Board.first.id, title: "Grape Vineyard"},
  {board_id: Board.first.id, title: "Koi Pond"},
  {board_id: Board.second.id, title: "Doing"},
  {board_id: Board.second.id, title: "Done"},
  {board_id: Board.third.id, title: "Do"},
  {board_id: Board.third.id, title: "Doing"},
  {board_id: Board.third.id, title: "Done"}
])

lists.second.insertBetween(lists.first)
lists.third.insertBetween(lists.second)

lists[4].insertBetween(lists[3])

lists[6].insertBetween(lists[5])
lists[7].insertBetween(lists[6])


cards = Card.create([
  {list_id: lists.first.id, title: "Plant tomatoes"},
  {list_id: lists.first.id, title: "Cull sage"},
  {list_id: lists.first.id, title: "Graft onions onto carrot plant"},
  {list_id: lists.first.id, title: "Spray pesticide"},
  {list_id: lists.second.id, title: "Drink wine"},
  {list_id: lists.second.id, title: "Wrink dine"},
  {list_id: lists.fourth.id, title: "Should belong to second board"},
  {list_id: lists.fifth.id, title: "Should also belong to second board"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
  # {list_id: lists.first.id, title: "Plant tomatoes"},
])

cards.second.insertBetween(cards.first)
cards.third.insertBetween(cards.second)
cards.fourth.insertBetween(cards.third)

cards[5].insertBetween(cards[4])
