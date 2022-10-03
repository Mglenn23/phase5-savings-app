class ItemsController < ApplicationController
    def index
        items=Item.all
        render json: items
    end
    def create
        item= Item.create!(items_params)
        render json: item, status: :created
    end

    def update
        item= find_items
        item.update!(items_params)
        render json: item
    end

    def destroy
        item= find_items
        item.destroy
        head :no_content
    end

    private
    def find_items
        Item.find_by(id: params[:id])
    end
    def items_params
        params.permit(:item_name, :item_price, :item_type, :item_url)
    end
end
