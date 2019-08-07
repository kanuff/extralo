json.array! @lists.each do |list|
    json.extract! list, :id, :title, :next_id, :prev_id, :archived
end