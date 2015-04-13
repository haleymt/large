module Api
  class PublicationWritesController < ApplicationController
    def create
      @pub_write = PublicationWrite.new(pub_write_params)
      if @pub_write.save
        render json: @pub_write
      else
        render json: @pub_write.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @pub_write = PublicationWrite.find(params[:id])
      @pub_write.destroy
      render json: {}
    end

    def index
      @pub_writes = PublicationWrite.all
      render json: @pub_writes
    end

    private
      def pub_write_params
        params.require(:publication_write).permit(:writer_id, :pub_id)
      end
  end
end
