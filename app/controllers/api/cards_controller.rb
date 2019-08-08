class Api::CardsController < ApplicationController
  def index
    @cards = Card.where({list_id: params[:list_id], archived: false})
    render :index
  end

  def create
    card = Card.new(card_params)
    card.list_id = params[:list_id]
    list_cards = List.find(params[:list_id]).cards.reject {|card| card.archived == true}
    old_leaf = list_cards.last.leaf if list_cards.length > 0
    if card.save
        if list_cards.length > 0
            @cards = card.insertBetween(old_leaf, "sentinel")
            render :multiShow
        else
            @cards = []
            @cards << card
            render :multiShow
        end
    end
  end

  def show
    @card = Card.find(params[:id])
    render :show
  end

  def update
    card = Card.find(params[:id])
    @cards = []

    if params[:card][:order_change] == "true"
        new_child = params[:card][:next_id] == 'sentinel' ? "sentinel" : Card.find(params[:card][:next_id]) 
        new_parent = params[:card][:prev_id] == 'sentinel' ? "sentinel" : Card.find(params[:card][:prev_id])
        card.list_id = params[:card][:list_id]
        if @cards = card.insertBetween(new_parent, new_child)
            render :multiShow
        end
    else
        if card.update(card_params)
            @cards << card 
            render :multiShow
        end
    end
  end

  def destroy
    card = Card.find(params[:id])
    card.archived = true
    if card.save!
        @cards = card.insertBetween()
        render :multiShow
    end
  end

  private
  def card_params
    params.require(:card).permit(:title, :description, :next_id, :prev_id, :order_change, :list_id)
  end
end