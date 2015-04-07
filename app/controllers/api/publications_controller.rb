module Api
  class PublicationsController < ApplicationController
    def create
      @pub = current_user.publications.new(pub_params)

      if @pub.save
        render json: @pub
      else
        render json: @pub.errors.full_messages, status: :unprocessable_entity
      end
    end

    def show
      @pub = Publication.find(params[:id])
      render json: @pub
    end

    def index
      @pubs = Publication.all
      render json: @pubs
    end

    def destroy
      @pub = current_user.publications.find(params[:id])
      @pub.try(:destroy)
      render json: {}
    end

    def update
      @pub = current_user.publications.find(params[:id])

      if @pub.update_attributes(pub_params)
        render json: @pub
      else
        render json: @pub.errors.full_messages, status: :unprocessable_entity
      end
    end

    private
      def pub_params
        params.require(:publication).permit(:title, :owner_id, :description)
      end
    end

end
