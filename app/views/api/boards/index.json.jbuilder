json.array! @boards.each do |board|
  json.extract! board, :id, :title
end