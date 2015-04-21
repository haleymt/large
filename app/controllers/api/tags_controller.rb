module Api
  class TagsController < ApplicationController
    def create
      @tag = Tag.new(tag_params)
      if @tag.save
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: :unproccessable_entity
      end
    end

    def index
      # if params[:query]
      #   search_params = "%#{params[:query]}%"
      #   @tags = Tag.all.where("label ILIKE :search", search: search_params)
      if params[:tag_id]
        tag = Tag.find(params[:tag_id])
        @tags = []
        tag.tagged_pubs.each do |pub|
          pub.tags.each do |tag|
            @tags << tag unless @tags.include?(tag)
          end
        end
        tag.tagged_stories.each do |story|
          story.tags.each do |tag|
            @tags << tag unless @tags.include?(tag)
          end
        end
      else
        @tags = Tag.all
      end
      render json: @tags
    end

    def show
      @tag = Tag.includes(:taggings).find(params[:id])
      render :show, include: [:tagged_pubs, :tagged_stories]
    end

    def destroy
    end

    private

      def tag_params
        params.require(:tag).permit(:label)
      end
  end
end
