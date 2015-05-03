module Api
  class UsersController < ApplicationController
    def show
      @user = User.includes(:stories, :publications, :followers).find(params[:id])
      render :show, include: [:followed_users]
    end

    def index
      if params[:query]
        search_params = "%#{params[:query]}%"
        @users = User.all.where("email ILIKE :search OR description ILIKE :search", search: search_params)
      elsif params[:current_user]
        @users = User.all.where("id = :id", id: current_user.id)
      else
        @users = User.all
      end
      render json: @users
    end

    def your_stories
      @user = User.includes(:stories, :publications).find(current_user.id)
      render :your_stories
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
