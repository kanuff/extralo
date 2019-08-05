json.array! @lists.each do |list|
    json.extract! list, :id, :title, :next_id, :prev_id, :archived
    json.extract! list, :card_ids
    # json.extract! list, :cards
    # json.set! "cards" do
    #     json.extract! list, :cards
    # end
end
# json.set! "cards" @list, :cards