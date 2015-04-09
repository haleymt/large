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
      @story = Story.find(params[:id])
      render json: @story
    end

    def index
      @stories = Story.all
      render json: @stories
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
        params.require(:story).permit(:title, :author_id, :pub_id, :story_id, :subtitle, :body, :header_image)
      end
  end
end
