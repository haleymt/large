module Api
  class StoriesController < ApplicationController
    def create
      @story = current_user.stories.new(story_params)

      if @story.save
        render json: @story
      else
        render json: @story.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @story = Story.includes(:tags, :taggings).find(params[:id])
      render :show
    end

    def index
      #refactor this into the user model
      if params[:current_user]
        objects = []
        current_user.followings.each do |following|
          if following.followable_type == "User"
            objects << User.find(following.followable_id)
          else
            objects << Publication.find(following.followable_id)
          end
        end
        @stories = []
        objects.each do |object|
          object.stories.each do |story|
            @stories << story unless @stories.include?(story)
          end
        end
      elsif params[:query]
        search_params = "%#{params[:query]}%"
        @stories = Story.where("title ILIKE :search OR subtitle ILIKE :search OR body ILIKE :search", search: search_params).includes(:tags, :taggings)
      else
        @stories = Story.all
      end

      render :index
    end

    def destroy
      @story = current_user.stories.find(params[:id])
      @story.try(:destroy)
      render json: {}
    end

    def update
      @story = current_user.stories.find(params[:id])

      if @story.update_attributes(story_params)
        render json: @story
      else
        render json: @story.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
      def story_params
        params.require(:story).permit(:title, :author_id, :pub_id, :story_id, :subtitle, :body, :header_image, :created_at)
      end
  end
end
