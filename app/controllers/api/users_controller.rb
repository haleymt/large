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
        @users = current_user
      else
        @users = User.all
      end
      render json: @users
    end

    def update
      @user = User.find(params[:id])

      if @user.update_attributes(user_params)
        render json: @user
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
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

    private

      def user_params
        params.require(:user).permit(:email, :password, :header_image, :icon_image, :description)
      end
  end
end
