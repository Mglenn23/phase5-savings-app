class UsersController < ApplicationController
     skip_before_action :authorize, only: :create
    def index
        users=User.all
        render json: users
    end
 
    def likes
        # byebug
        users=find_users
        likes=    Like.find_by(user_id: params[:id])
        # do |dat|
        # # if(dat.user_id ===4)
        #    return {dat.id}
        # #  end
        # end

      render json: users
        # item = Item.find_by(item_id: params[:])
        
    end
    def create
        user= User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end
    def show
        render json: @current_user
    end
    def update
        user= find_users
        user.update!(user_params)
        render json: user
    end

    def destroy
        user= find_users
        user.destroy
        head :no_content
    end

    private
    def find_users
        User.find_by(id: params[:id])
    end
    def user_params
      params.permit(:username, :password, :password_confirmation, :user_role, :user_balance, :user_savings)
    end
end
