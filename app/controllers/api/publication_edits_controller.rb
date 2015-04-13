module Api
  class PublicationEditsController < ApplicationController
    def create
      @pub_edit = PublicationEdit.new(pub_edit_params)
      if @pub_edit.save
        render json: @pub_edit
      else
        render json: @pub_edit.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @pub_edit = PublicationEdit.find(params[:id])
      @pub_edit.destroy
      render json: {}
    end

    def index
      @pub_edits = PublicationEdit.all
      render json: @pub_edits
    end

    private
      def pub_edit_params
        params.require(:publication_edit).permit(:editor_id, :pub_id)
      end
  end

end
