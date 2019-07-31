json.array! @boards.each do |board|
  json.partial! 'api/boards/board.json.jbuilder', board: board
end