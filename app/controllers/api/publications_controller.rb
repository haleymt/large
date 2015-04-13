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
      @pub = Publication.includes(:stories).find(params[:id])
      render :show, include: :toggle_follow
    end

    def about
      @pub = Publication.includes(:pub_writes, :pub_edits, :editors, :writers).find(params[:id])
      render :about
    end

    def index
      if params[:current_user]
        @pubs = current_user.publications
      else
        @pubs = Publication.all
      end
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

    def toggle_follow
      @pub = Publication.find(params[:id])
      @follow = Follow.find_by(
        followable_id: @pub.id, followable_type: "Publication", follower_id: current_user.id
      )

      if !!@follow
        @follow.destroy
      else
        @follow = Follow.create!(
          followable_id: @pub.id, followable_type: "Publication", follower_id: current_user.id
        )
      end
    end

    private
      def pub_params
        params.require(:publication).permit(:title, :owner_id, :description, :header_image)
      end
    end

end
