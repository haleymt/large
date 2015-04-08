module Api
  class UsersController < ApplicationController
    def show
      @user = User.includes(:stories, :publications).find(params[:id])
      # render json: @user
      render :show
    end

    def index
      @users = User.all
      render json: @users
    end
  end

end
