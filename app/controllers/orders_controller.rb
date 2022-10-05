class OrdersController < ApplicationController
    def index
        order=Order.all
        render json: order
    end
    def create
        order= Order.create!(order_params)
        render json: order, status: :created
    end
   def update
    order= find_order
    order.update!(order_params)
        render json: order
    end
    private
    def find_order
        Order.find_by(id: params[:id])
    end
    def order_params
        params.permit(:order_status,:user_id,:item_id)
    end

end
