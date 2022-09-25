class ItemsController < ApplicationController
    def index
        items=Item.all
        render json: items
    end
    def create
        item= Item.create!(params.permit(:item_name, :item_price, :item_type, :item_url))
        
        render json: item, status: :created
    end


end
