
json.board do
    json.extract! board, :id, :title, :description, :member_ids, :creator_id, :updated_at, :created_at
end
json.lists do
    json.array! board.lists.each do |list|
        json.extract! list, :id, :title, :next_id, :prev_id, :archived
    end
end
json.cards do
    json.array! board.cards.each do |card|
        json.extract! card, :id, :title, :description, :list_id, :next_id, :prev_id, :archived
    end
end
