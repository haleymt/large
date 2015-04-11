module Api

  class FollowsController < ApplicationController
    def create
      @follow = current_user.followings.new(follow_params)
      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      if params[:current_user]
        @follows = current_user.followings
      else
        @follows = Follow.all
      end
      render json: @follows
    end

    def destroy
      @follow = Follow.find(params[:id])
      @follow.destroy
      render json: {}
    end

    def follow_params
      params.require(:follow).permit(:follower_id, :followable_type, :followable_id)
    end
  end

end
