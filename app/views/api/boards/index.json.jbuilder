json.array! @boards.each do |board|
  json.extract! board, :id, :title, :creator_id
end