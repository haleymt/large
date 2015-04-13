module Api
  class TaggingsController < ApplicationController
    def create
      @tagging = Tagging.new(tagging_params)
      if @tagging.save
        render json: @tagging
      else
        render json: @tagging.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @tagging = Tagging.find(params[:id])
      @tagging.destroy
      render json: {}
    end

    private
      def tagging_params
        params.require(:tagging).permit(:tag_id, :taggable_id, :taggable_type)
      end
  end
end
