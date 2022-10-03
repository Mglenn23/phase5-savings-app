class LikesController < ApplicationController
    # before_action :find_likes, only: [:destroy]
    def index
        like=Like.all
        render json: like
    end
    def create
        like= Like.create!(like_params)
        render json: like, status: :created
    end
    def destroy
        like= find_likes
        like.destroy
         render json: like
    end

 
    private
    def find_likes
        Like.find_by(id: params[:id])
    end
    def like_params
        params.permit(:user_id,:item_id)
    end
end
