class Api::CardsController < ApplicationController
  def index
    @cards = Card.where({list_id: params[:list_id], archived: false})
    render :index
  end

  def create
    @card = Card.new(card_params)
    @card.list_id = params[:list_id]
    if @card.save
      list_cards = List.find(params[:list_id]).cards
      if list_cards.length > 1
        list_cards[list_cards.length-2].insertNode(@card)
      end
      render :show
    end
  end

  def show
    @card = Card.find(params[:id])
    render :show
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      render :show
    end
  end

  def destroy
    @card = Card.find(params[:id])
    Card.removeNode(@card)
    @card.archived = true
    if @card.save!
        render :show
    end
  end

  private
  def card_params
    params.require(:card).permit(:title, :description)
  end
end