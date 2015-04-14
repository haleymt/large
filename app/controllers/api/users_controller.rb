module Api
  class UsersController < ApplicationController
    def show
      @user = User.includes(:stories, :publications).find(params[:id])
      # render json: @user
      render :show, include: :toggle_follow
    end

    def index
      if params[:query]
        search_params = "%#{params[:query]}%"
        @users = User.all.where("email ILIKE :search OR description ILIKE :search", search: search_params)
      else
        @users = User.all
      end
      render json: @users
    end

    def toggle_follow
      @user = User.find(params[:id])
      @follow = Follow.find_by(
        followable_id: @user.id, followable_type: "User", follower_id: current_user.id
      )

      if !!@follow
        @follow.destroy
      else
        @follow = Follow.create!(
          followable_id: @user.id, followable_type: "User", follower_id: current_user.id
        )
      end
    end

  end
end
