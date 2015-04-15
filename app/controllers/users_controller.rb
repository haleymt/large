class UsersController < ApplicationController
  def new; end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  # def toggle_follow
  #   @user = User.find(params[:id])
  #   @follow = Follow.find_by(
  #     followable_id: @user.id, followable_type: "User", follower_id: current_user.id
  #   )
  #
  #   if !!@follow
  #     @follow.destroy
  #   else
  #     @follow = Follow.create!(
  #       followable_id: @user.id, followable_type: "User", follower_id: current_user.id
  #     )
  #   end
  # end

  private

  def user_params
    params.require(:user).permit(:email, :password, :header_image, :icon_image)
  end
end
