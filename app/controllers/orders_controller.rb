class OrdersController < ApplicationController
    def index
        order=Order.all
        render json: order
    end
    def create
        order= Order.create!(order_params)
        render json: order, status: :created
    end
    private
    def order_params
        params.permit(:order_status,:user_id,:item_id)
    end
end
