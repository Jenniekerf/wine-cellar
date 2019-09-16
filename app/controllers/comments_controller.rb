class CommentsController < ApplicationController
before_action :find_bottle
before_action :find_comment, only: [:edit, :update, :destroy]

  def new
    @comment = Comment.new
  end

  def create

    @comment = Comment.new(comment_params)
    @comment.bottle_id = @bottle.id
    @comment.user_id = current_user.id

    if @comment.save
      #render json: @comment, status: 201
      redirect_to bottle_path(@bottle)
    else
      #render json: { errors: @comment.errors.full_messages }, status: :bad_request
      render 'new'
    end
  end

  # def show
  #   render json: @comment
  # end

  def edit
    @bottle = Bottle.find(params[:bottle_id])
    @comment = Comment.find(params[:id])
  end

  def update
    if @comment.update(comment_params)
      redirect_to bottle_path(@bottle)
    else
      render 'edit'
    end
  end

  def destroy
    @comment.destroy
    redirect_to bottle_path(@bottle)
  end



  private

  def comment_params
    params.require(:comment).permit(:tasting_note)
  end

  def find_bottle
  @bottle = Bottle.find(params[:bottle_id])
  end

  def find_comment
  @comment = Comment.find(params[:id])
  end

end
